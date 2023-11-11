import os
import mimetypes
from mitmproxy import http
import json

store_file = open ("store.json", "r")
store = json.loads(store_file.read())

# Хосты, на которых происходит подмена файлов
hosts = store["hosts"]

modules = store["modules"]

store_file.close()

# Удаленные пути в порядке обработки
# У более специфичных (длинных) путей притритет обработки выше
# remote_prefixes = sorted(remote_prefixes_to_local_prefixes.keys(), reverse=True)
# print(remote_prefixes_to_local_prefixes)

# Функция получения локального файла
def get_file(path):
    if os.path.exists(path):
        with open(path) as file:
            return file.read()

    return None

# Функция получения типа файла
def get_mimetype(path):
    mimetype, encoding = mimetypes.guess_type(path)
    return mimetype

# Функция получения заголовка Access-Control-Allow-Origin
def get_origin_header(flow):
    request = flow.request
    return request.scheme + '://' + hosts[request.pretty_host]["origin"]

# Обработчик события получения запроса от клиента (браузера)
# Именно в этом обработчике происходит подмена файлов
def request(flow):
    request = flow.request

    if request.pretty_host not in hosts: return

    remote_path = request.path.split('?')[0]

    for moduleName in modules.keys():
        module = modules[moduleName]

        if module["enabled"] is False: continue

        remote_prefix = module["remotePrefix"]

        if not remote_path.startswith(remote_prefix): continue

        local_prefix = module["localPrefix"]
        local_path = remote_path.replace(remote_prefix, local_prefix)
        print(local_path)
        file = get_file(local_path)
        mimetype = get_mimetype(local_path)

        if file:
            headers = {
                'Content-type': mimetype or 'text/plain',
                'Access-Control-Allow-Origin': get_origin_header(flow),
                'Access-Control-Allow-Credentials': 'true'
            }

            flow.response = http.Response.make(200, file, headers)
        else:
            flow.response = http.Response.make(404, 'File not found: ' + local_path)

        break
