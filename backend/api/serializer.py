from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):  
        # Sua loi: Invalid password format or unknown hashing algorithm.
        user = User.objects.create(**validated_data)
        password = validated_data.pop('password', None) 
        user.is_active = True
        if password is not None:
            # Set password does the hash, so you don't need to call make_password 
            user.set_password(password)
        user.save()
        return user
    
    # def validate_password(self, value: str) -> str:
    #     """
    #     Hash value passed by user.

    #     :param value: password of a user
    #     :return: a hashed version of the password
    #     """
    #     return make_password(value)

    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}