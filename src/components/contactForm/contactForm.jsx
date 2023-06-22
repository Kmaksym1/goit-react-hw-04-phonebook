
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import css from '../contactForm/contactForm.module.css';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().min(7).max(12).required(),
});

export const ContactForm  = ({createName})=>{

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = ({target}) => {
    if (target.name === 'name') {
      setName(target.value)
    } else if (target.name === 'number') {
      setNumber(target.value)
    }
  };

  const handleSubmit = values => {
    createName({
      name: values.target.name.value,
      number: values.target.number.value,
    });
    setName('');
    setNumber('');
  };

 
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className={css.formContainer} onSubmit={handleSubmit}>
          <div className={css.imputName}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              className={css.imputString}
              onChange={handleInput}
              value={name}
            />

            <label htmlFor="name" className="form-label">
              Number
            </label>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              className={css.imputString}
              onInput={handleInput}
              value={number}
            />
          </div>

          <button type="submit" className={css.addBtn}>
            Add contact
          </button>
        </Form>
      </Formik>
    );
  }



