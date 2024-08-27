'use client'

import Button from '@/components/UI/button/Button'
import Form from '@/components/UI/form/Form'
import InputEmail from '@/components/UI/form/InputEmail'
import InputPassword from '@/components/UI/form/InputPassword'
import Label from '@/components/UI/form/Label'
import Input from '@/components/UI/form/input/Input'
import styles from './Form.module.scss'

export default function RegisterForm() {
	return (
		<Form>
			<Label>
				Имя
				<Input type='text' placeholder='Ваше имя' />
			</Label>
			<Label>
				Email
				<InputEmail placeholder='mail@gmail.com' required />
			</Label>
			<Label>
				Пароль
				<InputPassword
					placeholder='Введите свой пароль'
					required
					minLength={6}
				/>
			</Label>
			<Label>
				Повторите пароль
				<InputPassword
					placeholder='Введите свой пароль'
					required
					minLength={6}
				/>
			</Label>
			<Button className={styles.btn}>Зарегистрироваться</Button>
		</Form>
	)
}
