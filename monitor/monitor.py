import time
import requests

from picamera import PiCamera
from envirophat import light
from envirophat import weather

wtemp_sensor = '/sys/bus/w1/devices/28-00000829846d/w1_slave'

def wtemp_raw():

    f = open(wtemp_sensor, 'r')
    lines = f.readlines()
    f.close()
    return lines

def wread_temp():

    lines = wtemp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = wtemp_raw()
    wtemp_output = lines[1].find('t=')

    if wtemp_output != -1:
        wtemp_string = lines[1].strip()[wtemp_output+2:]
        wtemp_c = float(wtemp_string) / 1000.0
        return wtemp_c

def write_file(file, value, ts):
    f = open(file, "a+")
    f.write("{},{}\n".format(ts, str(value)))
    f.close()


ts = time.strftime("%Y-%m-%d %H:%M:%S")
fs = time.strftime("%Y-%m-%d-%H-%M-%S")
light = light.light()
airtemp =  str(weather.temperature())
airpress = str(weather.pressure())
watertemp = wread_temp()

print "Time: {}, Light: {}, Air Temp: {:.6}C, Air Press: {:.6}, Water Temp: {}C".format(ts, light, airtemp, airpress, watertemp)

r = requests.get('https://serioustime.io/api/SQtbKABnsD9r2Lu6F/uz0k9/now/{}'.format(light));
r = requests.get('https://serioustime.io/api/67zYukQYFngjb3QTk/cmcxr/now/{}'.format(watertemp));
r = requests.get('https://serioustime.io/api/CwmLesuG3XdHAQMep/89f6r/now/{}'.format(airtemp));

#write_file('light.txt', light, ts)
#write_file('airpress.txt', airpress, ts)
#write_file('temp.txt', "{},{}".format(airtemp, watertemp), ts)

camera = PiCamera()
camera.rotation = 180
camera.start_preview()
time.sleep(5)
camera.capture('tank-{}.jpg'.format(fs))
camera.stop_preview()

