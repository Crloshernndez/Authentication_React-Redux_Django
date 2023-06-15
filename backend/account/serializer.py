from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(UserCreateSerializer):
    """
    Custom serializer for User model that extends UserCreateSerializer.
    """

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'id',
            'email',
            'name',
            'is_active',
            'is_staff',
        ]