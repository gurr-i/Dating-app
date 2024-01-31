import React from 'react';
import { useGoogleLogin } from "@stack-pulse/next-google-login";
import { useNavigate } from 'react-router-dom';

const GoogleLoginSocial = () => {
    const navigate = useNavigate();
    const { signIn } = useGoogleLogin({
        clientId: "1095865446899-ij588crmvvagq1jco12pvljahfma6oo6.apps.googleusercontent.com",
        onSuccess: async (tokenResponse) => {
            navigate('/success', { state: { tokenResponse } });
        },
        onFailure: async (tokenResponse) => {
            console.log("Failed!")
        }
    });

    return (
        <button onClick={signIn}>Sign in With Google New</button>
    );
};

export default GoogleLoginSocial;
