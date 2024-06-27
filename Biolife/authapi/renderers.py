from rest_framework import status
from rest_framework.renderers import JSONRenderer
import json


class UserRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'status_code' in renderer_context:
            status_code = renderer_context['status_code']
            if status_code >= status.HTTP_400_BAD_REQUEST:
                # Handle errors based on status code or data type
                if isinstance(data, dict) and data.get('detail'):
                    # Specific error with detail message
                    response = json.dumps({'error': data.get('detail')})
                elif isinstance(data, list):
                    # List of errors (e.g., validation errors)
                    errors = []
                    for error in data:
                        errors.append({'error': error.get('message')})
                    response = json.dumps({'errors': errors})
                else:
                    # Generic error message
                    response = json.dumps({'error': 'An error occurred.'})
        else:
            response = json.dumps(data)

        return response
