import os
import mimetypes
from mitmproxy import http
import json

store_file = open ("store.json", "r")
store = json.loads(store_file.read())

# for i in data['emp_details']:
#     print(i)

# Хосты, на которых происходит подмена файлов  
hosts = store["hosts"]

# Соответствия между хостами и ориджинами
# Используются при формировании заголовков Access-Control-Allow-Origin
hosts_to_origins = store["origins"]

# Соответствия между удаленными и локальными путями (для подмены файлов необходимо указать соответствие)
remote_prefixes_to_local_prefixes = store["prefixes"]

# print(remote_prefixes_to_local_prefixes)
# print(hosts)
# print(hosts_to_origins)


store_file.close()

# # Соответствия между удаленными и локальными путями (для подмены файлов необходимо указать соответствие)
# remote_prefixes_to_local_prefixes = {
    # "/static/resources/Vehicle/": "/Users/gsk/tensor/works-management/application/Vehicle/",
    # "/resources/Vehicle/": "/Users/gsk/tensor/works-management/application/Vehicle/",
    # "/resources/VehicleCore/": "/Users/gsk/tensor/works-management/application/VehicleCore/",
    # "/resources/DocFine/": "/Users/gsk/tensor/doc-fine/application/DocFine/"

    # '/static/resources/DriverLicense': '/Users/gsk/tensor/works-management/application/DriverLicense',
    # '/static/resources/Delivery/Order': '/Users/gsk/tensor/presto-delivery/client/Delivery/Order',
    # '/resources/WorksManagement': '/Users/gsk/tensor/works-management/application/WorksManagement',
    # '/static/resources/SabyMaps/': '/Users/gsk/tensor/sabymaps/application/SabyMaps/',
    # '/resources/SabyMaps': '/Users/gsk/tensor/sabymaps/application/SabyMaps',
    # '/static/resources/WorksManagement': '/Users/gsk/tensor/works-management/application/WorksManagement',
    # '/static/resources/DocFine/': '/Users/gsk/tensor/doc-fine/application/DocFine/',
    # '/static/resources/Vehicle/': '/Users/gsk/tensor/works-management/application/Vehicle/',
    # '/static/resources/VehicleCore': '/Users/gsk/tensor/works-management/application/VehicleCore',
    # '/static/resources/Vehicle/': '/Users/gsk/tensor/works-management/application/Vehicle/',
    # '/static/resources/VehicleCore/': '/Users/gsk/tensor/works-management/application/VehicleCore/',
    # '/resources/DocFine': '/Users/gsk/tensor/doc-fine/application/DocFine',
    # '/VehicleCore': '/Users/gsk/tensor/works-management/application/VehicleCore',
#     '/static/resources/UsersOnMap': '/Users/gsk/tensor/geocoding/application/UsersOnMap',
    # '/resources/GeoLocation': '/Users/gsk/tensor/geocoding/application/GeoLocation',
    # '/static/resources/GeoLocation': '/Users/gsk/tensor/geocoding/application/GeoLocation',
    # '/static/resources/GeoCommon': '/Users/gsk/tensor/geocoding/application/GeoCommon',
    # '/resources/GeoComponents': '/Users/gsk/tensor/geocoding/application/GeoComponents',
    # '/static/resources/GeoComponents': '/Users/gsk/tensor/geocoding/application/GeoComponents',
    # '/static/resources/FMCore/': '/Users/gsk/tensor/core/application/FMCore/',
    # '/resources/FMCore': '/Users/gsk/tensor/core/application/FMCore',
    # '/static/resources/FMCoreControls': '/Users/gsk/tensor/core/application/FMCoreControls',
# }

# Удаленные пути в порядке обработки
# У более специфичных (длинных) путей притритет обработки выше
remote_prefixes = sorted(remote_prefixes_to_local_prefixes.keys(), reverse=True)
print(remote_prefixes_to_local_prefixes)

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
    return request.scheme + '://' + hosts_to_origins[request.pretty_host]

# Обработчик события получения запроса от клиента (браузера)
# Именно в этом обработчике происходит подмена файлов
def request(flow):
    request = flow.request

    if request.pretty_host not in hosts: return

    remote_path = request.path.split('?')[0]
    
    for remote_prefix in remote_prefixes:
        if not remote_path.startswith(remote_prefix): continue

        local_prefix = remote_prefixes_to_local_prefixes[remote_prefix]
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
