import { useState } from "react";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { validateCommentForm } from "../../utils/validateCommentForm";
import { useDispatch } from "react-redux";
import { postComment } from "./commentsSlice";
const CommentForm = ({ campsiteId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const HandleSubmit = (values) => {
        const comment = {
            campsiteId: parseInt(campsiteId),
            rating: values.rating,
            author: values.author,
            text: values.commentText,
            date: new Date(Date.now()).toISOString()
        };
        console.log(comment);
        dispatch(postComment(comment));
        setModalOpen(false);
    };

    return (
        <>
            <Button outline onClick={() => setModalOpen(true)}>
                <i className='fa fa-pencil fa-lg' /> Add Comment
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={() => { setModalOpen(false) }}>Add Comment</ModalHeader>
                <ModalBody>
                    <Formik initialValues={{
                        rating: "",
                        author: "",
                        commentText: ""
                    }} onSubmit={HandleSubmit} validate={validateCommentForm}>
                        <Form>

                            <FormGroup>
                                <Label htmlFor='rating'> Rating </Label>
                                <Field name='rating'
                                    as='select'
                                    className='form-control'>
                                    <option>Select...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Field>
                                <ErrorMessage name='rating'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='author'> Your Name </Label>

                                <Field
                                    name='author'
                                    placeholder='Your Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='author'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='commentText'> Comment </Label>
                                <Field
                                    name='commentText'
                                    as='textarea'
                                    rows='12'
                                    className='form-control'
                                />
                            </FormGroup>
                            <Button type='submit' color='primary'>
                                Submit
                            </Button>

                        </Form>
                    </Formik>

                </ModalBody>
            </Modal >
        </>
    )
};
export default CommentForm;