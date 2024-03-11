import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from "../../../features/auth/authSlice";

const Changepassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // Handle password mismatch error here
            return;
        }
        dispatch(changePasswordAsync(password));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="section">
            <div className="breadcrumb">
                <h1>Organic Fruits</h1>
            </div>
            <div className="auth-sec">
                <div className="container">
                    <div className="boillife-nav d-flex">
                        <a href="/" className="home-page">Home</a>
                        <span>/</span>
                        <a href="/register" className="nav-item">Change Password</a>
                    </div>
                </div>

                <div className="auth-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="signin-container">
                                    <form onSubmit={handleSubmit} name="frm-login" method="post">
                                        <p className="form-row d-grid">
                                            <label htmlFor="fid-pass">Password:<span className="requite">*</span></label>
                                            <input type="password" id="fid-pass" name="password" placeholder="Password" className="txt-input" value={password} onChange={handlePasswordChange} required />
                                        </p>
                                        <p className="form-row d-grid">
                                            <label htmlFor="fid-confirm-pass">Confirm Password:<span className="requite">*</span></label>
                                            <input type="password" id="fid-confirm-pass" name="confirmPassword" placeholder="Confirm Password" className="txt-input" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                                        </p>
                                        <p className="form-row wrap-btn">
                                            <button className="btn-style" type="submit">Change Password</button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Changepassword;
