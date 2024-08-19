import time
import random
import requests

def get_activities(i=0):
    random_delay = random.uniform(2, 3)

    print(f"Delay for {random_delay:.2f} seconds")
    time.sleep(random_delay)
    requests.get("https://eooiow8yno8cwp4.m.pipedream.net/")
    print("End of delay")
    if i < 5:
        i = i + 1
        get_activities(i)


def get_activities1(url='https://eooiow8yno8cwp4.m.pipedream.net/'):
    time.sleep(2)
    requests.get(url)
    print("End of delay")


import time
import random
import requests

def get_activities(i=0):
    random_delay = random.uniform(2, 3)

    print(f"Delay for {random_delay:.2f} seconds")
    time.sleep(random_delay)
    requests.get("https://eooiow8yno8cwp4.m.pipedream.net/")
    print("End of delay")
    if i < 5:
        i = i + 1
        get_activities(i)


def get_activities1(url='https://eooiow8yno8cwp4.m.pipedream.net/'):
    time.sleep(2)
    requests.get(url)
    print("End of delay")
