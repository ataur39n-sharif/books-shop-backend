import { Button, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function SearchFilterComponent() {
    const [activeFilter, setActiveFilter] = useState(false)
    console.log(activeFilter);

    return (
        <Row>
            <Col sm={12}>
                <TextField fullWidth label="Search by author name, book title and genre" id="fullWidth" />
            </Col>

            <Col sm={12} >
                <span><Switch defaultChecked={activeFilter} onChange={() => setActiveFilter(!activeFilter)} />Filter</span>
            </Col>
            {
                activeFilter && <Col sm={6} className="p-3">
                    <div className="bg-light p-3">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={5}>
                                Genre (optional)
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control type="text" placeholder="Type a genre" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={5}>
                                Publication Date (optional)
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control type="date" placeholder="select date" />
                            </Col>
                        </Form.Group>
                    </div>
                </Col>
            }
            <Col sm={12} className="text-center">
                <Button variant="contained">{activeFilter ? 'Filter' : 'Search'}</Button>
            </Col>

        </Row>
    )
}