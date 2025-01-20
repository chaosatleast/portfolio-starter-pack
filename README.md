# Portfolio Starter Pack

## Description

This portfolio starter pack is built with **Next.js** and **Sanity.io**. It is designed to be a fully functional portfolio website, allowing you to showcase your work while being highly customizable. To use this setup, you will need to create an account on [Sanity.io](https://www.sanity.io/) for managing content.

---

## Prerequisites

1. Before you begin, visit [Sanity.io](https://www.sanity.io) and create an account. You can create one for free.

2. Next, install the Sanity CLI (skip this if you have done it before):

```bash
npm install -g @sanity/cli
```

---

## Setup Guide

### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/chaosatleast/portfolio-starter-pack.git
cd <repository-folder>
```

---

### 2. Install Dependencies

Navigate to the root directory and install the dependencies for the `nextjs` folder:

```bash
# Install dependencies for the Next.js frontend
npm install
# or
yarn install
```

---

### 3. Set Up Sanity Studio in Your Working Directory

1. Log in to your Sanity account:

   ```bash
   sanity login
   ```

2. After logging in, set up the Sanity Studio in the project:

   ```bash
   sanity init
   ```

   The following screenshot shows the prompts during setup. You can use this as a guideline:

   ![Prompt Guide](https://img-chaosatleast.vercel.app/prompt-guide.png)

   Once set up, visit the Sanity website to check your **Project ID** and **Dataset Name**.

---

### 4. Configure Environment Variables

1. Create a `.env` file based on the `.env.example` template provided.
2. Add the following environment variables to the `.env` file in the `nextjs` folder:
   ```plaintext
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=
   NEXT_PUBLIC_SANITY_API_VERSION= (optional)
   ```

---

### 6. Start the Development Servers

```bash
npm run dev
# or
yarn dev
```

The Next.js app will be available at [http://localhost:3000](http://localhost:3000) and the Sanity Studio at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Precautions

After you have successfully deployed on your local development server, you are strongly encouraged to fill in the data in the Sanity Studio before making any changes to the frontend code. Skipping this step may result in data missing errors or unexpected behavior in the portfolio display.

---

## References

Landing Page Image Animation: [https://tympanus.net/codrops/2024/02/07/on-scroll-revealing-webgl-image-explorations/](https://tympanus.net/codrops/2024/02/07/on-scroll-revealing-webgl-image-explorations/)

---

## Credits

This project was created by [ChaosAtleast](https://atleastdevspace.com). If you find it helpful, I’d appreciate a mention or a link back to my work.

---

## FAQs

**Q: What if I don’t have a Sanity account?**
A: You can sign up for free at [Sanity.io](https://www.sanity.io/).

**Q: Can I customize the schema?**
A: Yes, you can edit the schema files in the `sanity/schemas` folder.

**Q: What should I do if I encounter issues?**
A: Refer to the documentation at [Sanity Docs](https://www.sanity.io/docs) or open an issue in this repository.

---

Enjoy building your portfolio!
