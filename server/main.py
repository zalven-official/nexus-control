import eel

eel.init('web')


@eel.expose
def say_hello_from_python():
    print("Hello from Python!")

eel.start('index.html', size=(800, 600))
