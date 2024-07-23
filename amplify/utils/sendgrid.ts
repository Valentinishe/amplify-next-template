import { SENDGRID_CONTACTS_LISTS } from '../constants/enums';

type ISendEmailsParams = {
  email: string,
  templateId: string,
  data: Object,
};

export const sendEmail = async ({ email, templateId, data }: ISendEmailsParams) => {
  const url = 'https://api.sendgrid.com/v3/mail/send';

  const body = {
    personalizations: [{
      to: [{ email }],
      dynamic_template_data: data,
    }],
    template_id: templateId,
    from: {
      email: process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL,
      name: process.env.NEXT_PUBLIC_SENDGRID_FROM_NAME,
    },
  };

  const payload = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  await fetch(url, payload);
};

type ICreateContactParams = {
  email: string,
};

export const addContact = async ({ email }: ICreateContactParams) => {
  const url = 'https://api.sendgrid.com/v3/marketing/contacts';

  const body = {
    list_ids: [SENDGRID_CONTACTS_LISTS.FOUNDER_PASS],
    contacts: [ { email } ],
  };

  const payload = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  const res = await fetch(url, payload).catch((err) => {
    console.error('Error adding contact:', String(err));
  });

  console.log('New contact was successfully added to markenting list, result:', res);
};