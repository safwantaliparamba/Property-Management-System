from django.contrib import admin
from django.urls import path,re_path, include
from django.conf import settings
from django.views.static import serve


urlpatterns = [
    path('chief/', admin.site.urls), #django admin urls
    
    path('api/v1/accounts/', include('api.v1.accounts.urls','api_v1_accounts')),
    
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATICFILES_DIRS}),

    path('', include('web.urls','web')),
]
