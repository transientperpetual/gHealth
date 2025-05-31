# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import FileSystemStorage
import os

class FileUploadView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Check if files are present in the request
            files = request.FILES.getlist('files')
            if not files:
                return Response({
                    'status': 'error',
                    'message': 'No files provided'
                }, status=status.HTTP_400_BAD_REQUEST)

            uploaded_files = []
            # Get the upload directory (you can customize this)
            upload_dir = 'uploads/'
            fs = FileSystemStorage(location=upload_dir)

            # Process each file
            for file in files:
                # Validate file (add your own validation rules)
                if file.size > 10 * 1024 * 1024:  # 10MB limit
                    return Response({
                        'status': 'error',
                        'message': f'File {file.name} exceeds 10MB limit'
                    }, status=status.HTTP_400_BAD_REQUEST)

                # Save the file
                filename = fs.save(file.name, file)
                file_path = os.path.join(upload_dir, filename)
                
                uploaded_files.append({
                    'name': file.name,
                    'size': file.size,
                    'path': file_path
                })

            return Response({
                'status': 'success',
                'message': 'Files uploaded successfully',
                'files': uploaded_files
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)