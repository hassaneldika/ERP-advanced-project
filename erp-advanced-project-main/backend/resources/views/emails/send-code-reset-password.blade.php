@component('mail::message')
<h1>We have received your request to reset your account password</h1>
<p>You can use the following code to recover your account:</p>

@component('mail::panel')
Pin code: {{ $token }}

<a href="https://erp-lamp-api.herokuapp.com/reset/{{$token}}">Click Here to change your password </a>

@endcomponent

<p>The allowed duration of the code is one hour from the time the message was sent</p>
@endcomponent

{{-- 
<!DOCTYPE html>
<html>
<head>
    <title>Forget Password</title>
</head>
<body>
    Change Your Password <a href="http://localhost:3000/reset/{{$token}}">Click Here</a>
    <br>
    Pincode: {{$token}}
</body>
</html> --}}