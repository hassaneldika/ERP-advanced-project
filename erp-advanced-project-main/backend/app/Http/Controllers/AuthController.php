<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Mail\ForgetMail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Login Process that checks for email and password and returns $user and their token
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
        ]);
        $check_if_active = array_merge($credentials, ["status" => "1"]);
        if (!Auth::attempt($check_if_active)) {
            return response()->json(
                [
                    "message" => "Invalid login details",
                ],
                401
            );
        }
        $user = Auth::user();
        if ($user) {
            $token = $user->createToken("auth_token")->plainTextToken;
            return response()->json([
                "user" => $user->only([
                    "first_name",
                    "picture",
                    "system_role_id",
                    "email",
                ]),
                "access_token" => $token,
            ]);
        }
        return response()->json(
            [
                "message" => "Error Occurred",
            ],
            404
        );
    }

    /**
     * Request a reset email for password change.
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function ForgetPassword(Request $request): JsonResponse
    {
        $request->validate([
            "email" => "required|email",
        ]);
        $email = $request->input("email");

        if (User::where("email", $email)->doesntExist()) {
            return response()->json(
                [
                    "message" => "Email Not Found",
                ],
                404
            );
        }

        // generate Random Token
        $token = random_int(10, 100000);
        try {
            if (
                DB::table("password_resets")
                    ->where("email", $email)
                    ->exists()
            ) {
                return response()->json(
                    [
                        "message" => "Request Already sent",
                    ],
                    400
                );
            }
            DB::table("password_resets")->insert([
                "email" => $email,
                "token" => $token,
            ]);

            // Mail send to user
            Mail::to($email)->send(new ForgetMail($token));
            return response()->json([
                "message" => "Reset Password Mail send on your email",
            ]);
        } catch (Exception $exception) {
            return response()->json(
                [
                    "message" => $exception->getMessage(),
                ],
                400
            );
        }
    }

    /**
     * Get the Pin code provided with the client to rest their password
     * @param Request $request
     * @return JsonResponse
     */
    public function ResetPassword(Request $request): JsonResponse
    {
        $request->validate([
            "token" => "required",
            "email" => "required|email",
            "password" => "required|min:8|confirmed",
        ]);

        $email = $request->input("email");
        $token = $request->input("token");
        $password = Hash::make($request->input("password"));
        $email_check = DB::table("password_resets")
            ->where("email", $email)
            ->first();
        $pin_check = DB::table("password_resets")
            ->where("token", $token)
            ->first();

        if (!$email_check) {
            return response()->json(
                [
                    "message" => "Email Not Found",
                ],
                401
            );
        }
        if (!$pin_check) {
            return response()->json(
                [
                    "message" => "Pin Code Invalid",
                ],
                401
            );
        }
        DB::table("users")
            ->where("email", $email)
            ->update(["password" => $password]);
        DB::table("password_resets")
            ->where("email", $email)
            ->delete();
        return response()->json([
            "message" => "Password Changed Successfully",
        ]);
    }
}
