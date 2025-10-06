import React from 'react'
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
  Box,
  Heading,
  Text,
  Center,
  Link
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import "../Registrationpage.css"
import { Route, Routes } from 'react-router-dom'

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password must be at most 20 characters"),
})

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log("Form submitted", data)
  }

  return (
    <Center minH="100vh" p={6}>
      <Box w="full" maxW="md" p={6} borderWidth="1px" rounded="md" boxShadow="md">
        <Heading size="md" mb={4} textAlign="center">Login</Heading>

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg" maxW="md">
            <Stack mb={4}>
              <Fieldset.Legend>Welcome Back!</Fieldset.Legend>
              <Fieldset.HelperText>
                Please enter your login details below.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field.Root required>
                <Field.Label>Username</Field.Label>
                <Input {...register("username")} name="username" placeholder="Enter username" />
                {errors.username && (
                  <Text color="red.500" fontSize="sm" mt={1}>{errors.username.message}</Text>
                )}
              </Field.Root>

              <Field.Root required mt={3}>
                <Field.Label>Password</Field.Label>
                <Input {...register("password")} name="password" type="password" placeholder="Enter password" />
                {errors.password && (
                  <Text color="red.500" fontSize="sm" mt={1}>{errors.password.message}</Text>
                )}
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start" mt={4} isLoading={isSubmitting}>
              Login
            </Button>

            <Text mt={4} fontSize="sm" textAlign="center">
              Don't have an account?{" "} 
              <Link as={RouterLink} to="/" color="blue.600" fontWeight="semibold">
                Register here
              </Link>
            </Text>

          </Fieldset.Root>
        </Box>
      </Box>
    </Center>
  )
}

export default LoginPage