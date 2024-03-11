from django.core.exceptions import PermissionDenied
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.conf import settings


def send_email(request, mail_subject, email_template, user):
    """Send email"""
    try:
        from_email = settings.DEFAULT_FROM_EMAIL
        current_site = get_current_site(request)
        message = render_to_string(email_template, {
            'user': user,
            'domain': current_site,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': default_token_generator.make_token(user),
        })
        to_email = user.email

        mail = EmailMessage(mail_subject, message, from_email, [to_email])
        mail.content_subtype = 'html'
        mail.send()

    except Exception as e:
        raise PermissionDenied(f"Error sending email: {e}")


def send_notification_email(mail_subject, mail_template, context):
    """Send notification email"""
    try:
        from_email = settings.DEFAULT_FROM_EMAIL
        message = render_to_string(mail_template, context)
        to_email = context['to_email'] if isinstance(
            context['to_email'], list) else [context['to_email']]

        mail = EmailMessage(mail_subject, message, from_email, to_email)
        mail.content_subtype = 'html'
        mail.send()

    except Exception as e:
        raise PermissionDenied(f"Error sending notification email: {e}")
