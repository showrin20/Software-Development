import React from 'react';
import { TextInput, Checkbox, Button, Group, Box, Textarea,Space } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function MyForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      favoriteCourses: [],
      comment: '',
    },

    validate: {
      name: (value) => (value.trim() ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      favoriteCourses: (value) => (value.length > 0 ? null : 'Select at least one favorite course'),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.currentTarget;
    const fieldValue = type === 'checkbox' ? checked : value;
    form.setFieldValue(name, fieldValue);
  };

  return (
    <div>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            name="name"
            value={form.values.name}
            onChange={handleChange}
            error={form.errors.name}
          />
      <Space h="md" />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            name="email"
            value={form.values.email}
            onChange={handleChange}
            error={form.errors.email}
          />
      <Space h="md" />

          <Checkbox.Group
            value={form.values.favoriteCourses}
            onChange={(values) => form.setFieldValue('favoriteCourses', values)}
            label="Select your favorite Course"
            description="This identifies your favorite course"
            withAsterisk
            error={form.errors.favoriteCourses}
          >
            <Group mt="xs">
              <Checkbox value="CSE110" label="CSE110" name="favoriteCourses" />
              <Checkbox value="CSE111" label="CSE111" name="favoriteCourses" />
              <Checkbox value="CSE220" label="CSE220" name="favoriteCourses" />
              <Checkbox value="CSE221" label="CSE221" name="favoriteCourses" />
              <Checkbox value="CSE422" label="CSE422" name="favoriteCourses" />
              <Checkbox value="CSE423" label="CSE423" name="favoriteCourses" />
            </Group>
          </Checkbox.Group>
          <Space h="md" />

          <Textarea
            placeholder="Your comment"
            label="Your comment"
            size="md"
            name="comment"
            value={form.values.comment}
            onChange={handleChange}
          />
      <Space h="md" />

          <Group position="right" mt="md\">
            <Button type="submit">Submit</Button>
          </Group>

        </form>
      </Box>
    </div>
  );
}
