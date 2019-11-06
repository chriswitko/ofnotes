import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/styles';

import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectPanelError } from '../store/selectors';
import * as actions from '../store/actions';

import NoteForm from '../components/NoteForm';
import { NoteFormButton } from '../components/NoteFormInputs';


const useStyles = makeStyles(theme => ({
  icon: {
    marginLeft: theme.spacing()
  }
}))

const CreateNoteForm = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const panelError = useSelector(selectPanelError)
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur'
  });
  const [values, setValues] = useState({
    title: '',
    md: '',
    tags: []
  })

  useEffect(() => {
    dispatch(actions.setCurrentNote(null))
  }, [dispatch])

  const onChange = e => {
    e.persist();
    setValues(previous => ({
      ...previous,
      [e.target.name]: e.target.value
    }))
  }

  const onSaveSuccess = slug => {
    history.push(`/${slug}`)
  }

  const onSave = () => {
    dispatch(actions.createNote(values, onSaveSuccess))
  }

  return (
    <NoteForm values={values}
              onChange={onChange}
              register={register}
              errors={errors}
              onSubmit={handleSubmit(onSave)}
              onSave={onSave}
              panelError={panelError}
              formActions={
                <NoteFormButton
                  type="submit"
                  aria-label="save note"
                  >
                   Save <SaveIcon className={classes.icon} />
                </NoteFormButton>
              }
              {...props}
              />
  )
}

export default CreateNoteForm;
