import logging
import sys
import time
import datetime as dt
import pymongo
from pymongo import MongoClient

logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s',
                    level=logging.DEBUG,
                    stream=sys.stdout)

def get_active_window():
    """
    Get the currently active window.

    Returns
    -------
    string :
        Name of the currently active window.
    """
    active_window_name = None
    if sys.platform in ['linux', 'linux2']:
        # Alternatives: http://unix.stackexchange.com/q/38867/4784
        try:
            import wnck
        except ImportError:
            logging.info("wnck not installed")
            wnck = None
        if wnck is not None:
            screen = wnck.screen_get_default()
            screen.force_update()
            window = screen.get_active_window()
            if window is not None:
                pid = window.get_pid()
                with open("/proc/{pid}/cmdline".format(pid=pid)) as f:
                    active_window_name = f.read()
        else:
            try:
                from gi.repository import Gtk, Wnck
                gi = "Installed"
            except ImportError:
                logging.info("gi.repository not installed")
                gi = None
            if gi is not None:
                Gtk.init([])  # necessary if not using a Gtk.main() loop
                screen = Wnck.Screen.get_default()
                screen.force_update()  # recommended per Wnck documentation
                active_window = screen.get_active_window()
                pid = active_window.get_pid()
                with open("/proc/{pid}/cmdline".format(pid=pid)) as f:
                    active_window_name = f.read()
    elif sys.platform in ['Windows', 'win32', 'cygwin']:
        # http://stackoverflow.com/a/608814/562769
        import win32gui
        window = win32gui.GetForegroundWindow()
        active_window_name = win32gui.GetWindowText(window)
    elif sys.platform in ['Mac', 'darwin', 'os2', 'os2emx']:
        # http://stackoverflow.com/a/373310/562769
        from AppKit import NSWorkspace
        active_window_name = (NSWorkspace.sharedWorkspace()
                              .activeApplication()['NSApplicationName'])
    else:
        print("sys.platform={platform} is unknown. Please report."
              .format(platform=sys.platform))
        print(sys.version)
    return active_window_name

def task_switch_detector(collection, username):

    start_time = time.perf_counter()
    time_compensation_factor = 60 / (60-int(dt.datetime.now().minute))

    task_switches = 0
    n_distracting_tasks = 0
    times_per_task = []
    distracting_tasks = ['VALORANT', 'Minecraft', 'YouTube', 'Instagram', 'Facebook', 'TikTok', 'Discord', 'Twitter', 'Reddit']
    sent_scores = False

    def energy_score(task_switches, task_times, time_compensation_factor, days_range, n_distracting_tasks, i):

        if len(task_times) != 0:
            average_task_time = sum(task_times)/len(task_times)
            
        else:
            average_task_time = 1

        current_date = dt.date.today()

        past_energy_scores = []

        for d in range(1, days_range):
        
            days_subtract = dt.timedelta(d)
            query = {"username": username, "date": str(current_date - days_subtract)}
            result = collection.find(query)
            
            for item in result:
                
                past_energy_scores.append(item['divided_energy_score']) 
        
        if i == 1 and (time_compensation_factor != 0 and n_distracting_tasks != 0):
            unweighted_present_score = (task_switches * time_compensation_factor * average_task_time)/n_distracting_tasks
        else:
            unweighted_present_score = (task_switches * average_task_time)

        score_sum = unweighted_present_score
        for score in past_energy_scores:
            score_sum += float(score)

        unweighted_energy_score = score_sum/days_range

        divided_energy_score = round(unweighted_energy_score/2, 0)
        average_task_time = round(average_task_time, 2)

        return average_task_time, unweighted_energy_score, divided_energy_score

    i = 1
    while i > 0:
        #print(task_switches)
        prev_active_window = str(get_active_window())

        if str(get_active_window()) != prev_active_window and dt.datetime.now().minute != 00:
            end_time = time.perf_counter()
            time_on_switch = round(end_time-start_time, 2)
            times_per_task.append(time_on_switch)
            
            for task in distracting_tasks:
                if task in str(get_active_window()):
                    n_distracting_tasks +=1

            task_switches +=1
            start_time = time.perf_counter()
        if dt.datetime.now().minute == 00 and sent_scores == False:
            #Send to Crysta webapp
            send_hour = dt.datetime.now().strftime('%I:00 %p')

            user_avgtasktime, user_unscaled_score, user_divided_score = energy_score(task_switches, times_per_task, time_compensation_factor, 7, n_distracting_tasks, i)
            update = {"username": username, "date": str(dt.date.today()), "hour": send_hour, "task_switches": task_switches, "average_task_time": user_avgtasktime, "distracting_tasks": n_distracting_tasks, "unscaled_energy_score": user_unscaled_score, "divided_energy_score": user_divided_score}
            
            collection.insert_one(update)
            sent_scores = True
            #Set task_switches to 0
            task_switches = 0
            i+=1
        if dt.datetime.now().minute != 00 and sent_scores == True:
            sent_scores = False