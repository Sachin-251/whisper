# Whisper

Whisper is a real-time messaging application built with modern web technologies, designed to provide a seamless and responsive user experience. The application features real-time messaging, notifications, authentication, and a sleek user interface.

## Tech Stack

- **Next.js**
- **React**
- **TailwindCSS**
- **Prisma**
- **MongoDB**
- **Next-Auth**
- **Pusher**

## Features

- **Real-Time Messaging**: Instant messaging powered by Pusher for real-time communication.
- **Message Notifications and Alerts**: Stay updated with message notifications and alerts.
- **Sleek UI Design**: TailwindCSS for a modern and attractive user interface.
- **Animations and Transitions**: Smooth animations and transition effects with TailwindCSS.
- **Full Responsiveness**: Optimized for all devices, providing a consistent experience across desktops, tablets, and mobile phones.
- **Credential Authentication**: Secure authentication with NextAuth.
- **Social Authentication**: Integration with Google and GitHub for easy login.
- **File and Image Uploads**: Upload files and images using Cloudinary CDN.
- **Form Validation**: Client-side form validation and handling with react-hook-form.
- **Error Handling**: Server error handling with react-toast for a better user experience.
- **Message Read Receipts**: See when messages have been read.
- **User Status**: Display online/offline user status.
- **Group Chats and One-on-One Messaging**: Support for both group chats and private messaging.
- **Message Attachments**: Share message attachments and files.
- **User Profile Customization**: Customize user profiles and settings.
- **Chat Room Management**: Create and manage chat rooms and channels.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/whisper.git
   cd whisper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the necessary environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   DATABASE_URL=your_mongodb_connection_string
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_KEY=your_pusher_key
   PUSHER_SECRET=your_pusher_secret
   PUSHER_CLUSTER=your_pusher_cluster
   CLOUDINARY_URL=your_cloudinary_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser and go to** `http://localhost:3000` **to view the app**.

## Usage

- Sign up or log in using email credentials, Google, or GitHub authentication.
- Start real-time messaging with individuals or groups.
- Upload and share files and images.
- Customize your user profile and manage chat rooms.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit them**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request**.


---

Feel free to reach out with any questions or feedback. Enjoy using Whisper!