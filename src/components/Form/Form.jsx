import {Button} from 'components/Button';
import {useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import { useDispatch } from 'react-redux';
import { createShortLink, selectLoading } from 'store/slice/linkSlice';
import { useSelector } from 'react-redux';

const Form = () => {
  const loading = useSelector(selectLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm(
    {mode:'onSubmit'}
  );

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createShortLink(data.Url));
    reset();
  }

  return (
    <section className={classes.section}>
      <div className="container">
        <form
          className={classes.form}
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="url"
            placeholder="Shorten a link here..."
            className={classes.input}
            {...register(
              'Url',{
                required: 'Please add the link!',
                pattern:{
                  value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                  message: 'please enter a valid link',
                }
            })}
            style ={{
              outlineColor: errors.Url ? 'var(--secondary-300)':'currentColor',
              outlineWidth: errors.Url ? '4px' : '1px',
            }}
            disabled = {loading === 'loading' }
          />
          <Button
            variant="square"
            type="submit"
            size="medium"
          >Shorten it!</Button>
          {errors.Url && (
            <div className={classes.error}>
              {errors.Url.message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export {Form};
