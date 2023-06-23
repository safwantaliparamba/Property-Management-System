
from django.http.response import HttpResponse
from django.http.request import HttpRequest

from rest_framework.response import Response

from accounts.models import Landlord
from general.functions import is_ajax


def landlord_required():
    def _method_wrapper(view_method):
        def _arguments_wrapper(request: HttpRequest, *args, **kwargs) :
            user = request.user

            if user.is_authenticated:

                if not Landlord.objects.filter(user=user,is_deleted=False,is_verified=True).exists():

                    if is_ajax(request):
                        response_data = {}
                        response_data['status'] = 'false'
                        response_data['stable'] = 'true'
                        response_data['title'] = 'Permission Denied'
                        response_data['message'] = "You have no permission to do this action."
                        # return HttpResponse(json.dumps(response_data), content_type='application/javascript')
                        return Response(response_data)
                    else:
                        context = {
                            "title" : "Permission Denied"
                        }
                        return HttpResponse('<h1>Permission Denied</h1>')

            return view_method(request, *args, **kwargs)

        return _arguments_wrapper

    return _method_wrapper
