import { Button, Col, Row, Input } from "antd";
import { useRef } from "react";
import styles from "./Signin.module.css";
import { LoginReqType } from "../types";
import { Navigate, useNavigate } from "react-router-dom";

interface SigninProps {
    login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    return (
        <Row align="middle" className={styles.signin_row}>
            <Col span={24}>
                <Row className={styles.signin_contents}>
                    <Col span={12}>
                        <img
                            src="./bg_signin.png"
                            alt="Signin"
                            className={styles.signin_bg}
                        />
                    </Col>
                    <Col span={12}>
                        <div className={styles.signin_title}>My Books</div>
                        <div className={styles.signin_subtitle}>
                            Please Note Your Opinion
                        </div>
                        <div className={styles.signin_underline} />
                        <div className={styles.email_title}>
                            Email
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input
                                placeholder="Email"
                                autoComplete="email"
                                name="email"
                                className={styles.input}
                                ref={emailRef}
                            />
                        </div>
                        <div className={styles.password_title}>
                            Password
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input
                                type="password"
                                autoComplete="current-password"
                                className={styles.input}
                                ref={passwordRef}
                            />
                        </div>
                        <div className={styles.button_area}>
                            <Button
                                size="large"
                                className={styles.button}
                                onClick={click}
                            >
                                Sign In
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

    const navigate = useNavigate();

    function click() {
        // console.log(emailRef.current!.input.value);
        const email = emailRef.current!.input.value;
        const password = passwordRef.current!.input.value;
        login({ email, password });
    }
};

export default Signin;