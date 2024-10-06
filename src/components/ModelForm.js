import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import {InputMask} from "primereact/inputmask";

const ModalForm = () => {
    const [displayModal, setDisplayModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Call API to save data
        console.log(data);
    };

    const onHide = () => {
        setDisplayModal(false);
    };

    const footer = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={handleSubmit(onSubmit)} autoFocus />
        </div>
    );

    return (
        <div>
            <Button label="Show Modal" icon="pi pi-external-link" onClick={() => setDisplayModal(true)} />

            <Dialog header="Modal Form" visible={displayModal} style={{ width: '50vw' }} footer={footer} onHide={onHide}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="name">Name</label>
                            <Controller name="name" control={control} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} rules={{ required: 'Name is required' }} />
                            {errors.name && <small className="p-error">{errors.name.message}</small>}
                        </div>

                        <div className="field col-6">
                            <label htmlFor="email">Email</label>
                            <Controller name="email" control={control} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} rules={{ required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }} />
                            {errors.email && <small className="p-error">{errors.email.message}</small>}
                        </div>

                        <div className="field col-6">
                            <label htmlFor="phone">Phone</label>
                            <Controller name="phone" control={control} render={({ field, fieldState }) => (
                                <InputMask id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} rules={{ required: 'Phone is required' }} />
                            {errors.phone && <small className="p-error">{errors.phone.message}</small>}
                        </div>

                        <div className="field col-6">
                            <label htmlFor="address">Address</label>
                            <Controller name="address" control={control} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} rules={{ required: 'Address is required' }} />
                            {errors.address && <small className="p-error">{errors.address.message}</small>}
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default ModalForm;