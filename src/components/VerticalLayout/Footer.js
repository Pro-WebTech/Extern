import React, {useEffect, useState} from "react";
import {Row, Col, Container, ModalBody, ModalFooter, Button, Modal, ModalHeader} from "reactstrap";
import jwt from "jsonwebtoken";
import API_URL from "../../constants/ApiUrl";
import axios from "axios";


const Footer = () => {

    const [modal_session, setModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            executeValidation();
        }, 10000);
        setModal(false);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function redirectTologin() {
        window.location.href = `/login`;
    }

    function paginaExpirada() {
        localStorage.removeItem("authUser");
        setModal(true);
        setTimeout(() => redirectTologin(), 15000);
    }

    function executeValidation() {
        let isExpired = false;
        const debug_validation = false;
        const token = localStorage.getItem("authUser");
        if (debug_validation) console.log("Validando token...");
        if (token !== undefined) {
            let decodedToken = jwt.decode(token, {complete: true});
            let dateNow = new Date();

            if (decodedToken === null) {
                if (debug_validation) console.log("Token não conseguiu ser decodificado.");
                paginaExpirada();
                return;
            }
            if (decodedToken.payload.exp < dateNow.getTime())
                isExpired = true;

            if (isExpired) {
                if (debug_validation) console.log("Token expirado... renovando token");
                const refreshToken = localStorage.getItem("refreshTokenAuthUser");
                const url = API_URL.REFRESH;
                const config = {
                    headers: {
                        Authorization: "Bearer " + refreshToken,
                    }
                }
                const data = {}
                axios.post(url, data, config).then(response => {
                    if (response.status === 400 || response.status === 500) {
                        // Redirect to the login page...
                        if (debug_validation) console.log("Token não conseguiu ser renovando");
                        paginaExpirada();
                    }

                    if (debug_validation) console.log("Token renovado com sucesso");
                    localStorage.setItem("authUser", response.data.token);
                }).catch(err => {
                    if (debug_validation) console.log("Token não conseguiu ser renovando");
                    paginaExpirada();
                    throw err[1];
                });

            } else {
                if (debug_validation) console.log("Token ok!");
            }

        } else {
            paginaExpirada();
        }
    }

    return (
        <React.Fragment>
            <Modal isOpen={modal_session}>
                <ModalHeader>Sua sessão esta expirada!</ModalHeader>
                <ModalBody>
                    <p>Clique no botão abaixo para fazer o login novamente. A página será automaticament
                        redirecionada em 10 segundos.</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="primary" className="waves-effect waves-light"
                        onClick={() => redirectTologin()}
                    >
                        Ir para a página de login.
                    </Button>
                </ModalFooter>
            </Modal>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} © Craveiro Contabilidade.
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-right d-none d-sm-block">
                                Todos os direitos reservados.
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
