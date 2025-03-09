from rest_framework import serializers
from .models import UserProfile
from authapi.serializers import UserSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']

    def to_representation(self, instance):
        """Return role-specific fields dynamically."""
        data = super().to_representation(instance)
        role = instance.user.role  # Get user role

        if role == 'admin':
            allowed_fields = ['user', 'profile_photo', 'email', 'contact_number', 'address',
                              'city', 'state', 'zip_code', 'bio', 'social_media_links', 'is_deleted',
                              'preferred_products', 'purchase_history', 'farm_name', 'farm_location',
                              'products_offered', 'certifications', 'website_url']
        elif role == 'customer':
            allowed_fields = ['user', 'profile_photo', 'email', 'contact_number', 'address',
                              'city', 'state', 'zip_code', 'bio', 'social_media_links',
                              'preferred_products', 'purchase_history']
        elif role == 'farmer':
            allowed_fields = ['user', 'profile_photo', 'email', 'contact_number', 'address',
                              'city', 'state', 'zip_code', 'bio', 'social_media_links',
                              'farm_name', 'farm_location', 'products_offered', 'certifications', 'website_url']
        else:  # Regular user
            allowed_fields = ['user', 'profile_photo', 'email', 'contact_number', 'address',
                              'city', 'state', 'zip_code', 'bio', 'social_media_links']

        return {field: data[field] for field in allowed_fields if field in data}

    def validate(self, attrs):
        """Validate required fields based on user role."""
        user = self.context['request'].user
        role = user.role

        if role == 'customer':
            required_fields = ['preferred_products', 'purchase_history']
        elif role == 'farmer':
            required_fields = ['farm_name',
                               'farm_location', 'products_offered']
        else:
            required_fields = []

        for field in required_fields:
            if not attrs.get(field):
                raise serializers.ValidationError(
                    {field: f"{field} is required for {role} role."})

        return attrs
