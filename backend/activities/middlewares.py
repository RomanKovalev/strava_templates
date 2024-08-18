class JWTAuthCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        jwt_token = request.COOKIES.get('jwt')
        if jwt_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {jwt_token}'

        response = self.get_response(request)
        return response
