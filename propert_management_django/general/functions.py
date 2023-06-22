import uuid
import random
import string
from PIL import Image
from random import randint
import base64

from django.core.files.base import ContentFile

from mailqueue.models import MailerMessage
from django.http.request import HttpRequest


def randomnumber(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)


"""
To get unique id's according to the length of n
"""


def generate_unique_id(n):
    unique_id = []

    characters = list(string.ascii_letters + string.digits)
    random.shuffle(characters)

    for i in range(n):
        unique_id.append(random.choice(characters))
    random.shuffle(unique_id)

    return "".join(unique_id)


"""
To get random password according to the length of n
"""


def random_password(n):
    password = []

    characters = list(string.ascii_letters + string.digits + "!@#$%^&*()")
    random.shuffle(characters)

    for i in range(n):
        password.append(random.choice(characters))
    random.shuffle(password)

    return "".join(password)


# function to join multiple serializer errors
def join_errors(_errors=[]):
    errors = {}
    for _error in _errors:
        if hasattr(_error, '_errors'):
            errors.update(_error._errors)

    return errors


def get_auto_id(model):
    auto_id = 1
    latest_auto_id = model.objects.all().order_by("-date_added")[:1]
    if latest_auto_id:
        for auto in latest_auto_id:
            auto_id = auto.auto_id + 1
    return auto_id


def is_valid_uuid(value):
    """
        to find the string is valid uuid 
    """
    try:
        uuid.UUID(str(value))

        return True
    except ValueError:
        return False


def get_client_ip(request: HttpRequest) -> str:
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')

    return ip


def resize_image(image: bytes or str, size: tuple = (30, 30)):
    resized_image = Image.open(image)
    resized_image.thumbnail(size)

    return resized_image


def is_ajax(request: HttpRequest) -> bool:
    # navigate - normal http request
    # cors - ajax request
    return request.META.get("HTTP_SEC_FETCH_MODE") == "cors"


def getDomain(request: HttpRequest) -> str:
    protocol = "http://"

    if request.is_secure():
        protocol = "https://"

    host = request.get_host()

    return protocol + host


"""
To get serializer errors from validation errors
"""


def generate_serializer_errors(args):
    message = ""
    for key, values in args.items():
        error_message = ""
        for value in values:
            error_message += value + ","
        error_message = error_message[:-1]

        message += f"{key} - {error_message} | "

    return message[:-3]


def send_email(to_address, subject, content, html_content, attachment=None, attachment2=None, attachment3=None, bcc_address=None):
    new_message = MailerMessage()
    new_message.subject = subject
    new_message.to_address = to_address
    if bcc_address:
        new_message.bcc_address = bcc_address
    new_message.from_address = "RentWise Pvt Ltd"
    new_message.content = content
    new_message.html_content = html_content
    if attachment:
        new_message.add_attachment(attachment)
    if attachment2:
        new_message.add_attachment(attachment2)
    if attachment3:
        new_message.add_attachment(attachment3)
    new_message.app = "default"
    new_message.save()

    return new_message.sent


def convert_base64_image_to_image(base64_image: str, name: str = None):
    """
         converting base64 image into normal image type
    """
    format, imgstr = base64_image.split(';base64,')
    ext = format.split('/')[-1]

    if not name:
        name = randomnumber(20)

    final_image = ContentFile(base64.b64decode(imgstr), name=f'{name}.{ext}')

    return final_image


def format_errors(errors: object):
    first_key, val = next(iter(errors.items()))

    error_message = errors.get(first_key)[0]
    error_code = errors.get('error_code', 3001)[0]

    return (error_message, error_code)
