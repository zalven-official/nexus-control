import sys
import PyInstaller.__main__
from PyInstaller.utils.hooks import collect_all

datas, binaries, hiddenimports = collect_all('eel')

if sys.platform == 'darwin':
    add_data_syntax = '--add-data=web:web'
    icon = 'src/assets/fav.icns'
else: 
    add_data_syntax = '--add-data=web;web'
    icon = 'src/assets/fav.ico'

PyInstaller.__main__.run([
    'main.py',
    '--noconsole',
    '--noconfirm',
    '--onedir', # for codesign or notarization
    '--windowed',
    '--icon=' + icon,
    add_data_syntax,
    '--add-data=src:src',
    '--hidden-import=eel',
    '--hidden-import=pywebview'
    '--target-architecture'
    '--clean'
])
