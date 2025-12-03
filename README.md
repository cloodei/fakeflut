Act as a Senior Product Designer and Lead Frontend Engineer (Flutter, Mobile Android).

Create a high-fidelity, fully functional mobile app prototype for "ClassPal" - a Digital Operation Center for University Classes.

The design must solve the problem of administrative overload by being automated, transparent, and user-friendly.

# 1. DESIGN SYSTEM & VISUAL IDENTITY

- **Theme:** "Gen Z Professional" – Modern, Clean, Trustworthy but Dynamic.

- **Color Palette:** Clean, minimalistic, modern and bright. Keep styling simple and avoid using too many standout coloring, only a maximum of 3-4 colors or less in one sitting. Use less gradient and try to invoke more depth and visual intricacies to components and containers with some shading and inset shadows.

- **Typography:** Inter or Poppins (Sans-serif) with primarily a mixup with Proxima Vara. High readability.

- **Navigation:** Only available on Class View, with an AppBar that has a sidebar toggle: Return to Main View, Help Center, Logout. Fixed Bottom Navigation Bar with 6 Tabs: Dashboard, Duties, Events, Assets, Funds, Profile.

# 2. SCREEN-BY-SCREEN REQUIREMENTS (Based on SRS)

## SCREEN A: AUTHENTICATION & CLASS SETUP (FR1 & FR2)

- **Login View:** Clean inputs for Email/Password. "Sign in with Google" button.

- **Main View:** A centralized, compact post sign-on view, display user's joined classes, and a button to open a popup displaying: "New Class" and "Join Class"; with input fields for creating a new class vs "Class Code" input or a large "Scan QR" button to join a class.

## SCREEN B: DASHBOARD (Home - The Operation Center)

- **Notifcations:** Display the most relevant notifications with different styles on each type.

- **Recent Activities Grid:** Encapsulate latest activities users have recently completed or should catch up on.

## SCREEN C: DUTY ROSTER MODULE (FR3)

- **Task Card (Detailed):**

  - Task Title & Time.

  - Assignee Avatar.

  - **Status Logic:**

    - If Status = Pending: Show "Upload Proof" button (Camera Icon).

    - If Status = Waiting Approval: Show "Pending Admin Review" badge.

    - If Status = Done: Show Green Checkmark.

- **Leaderboard Widget (FR3.4):** A gamified section showing Top 3 students with highest contribution points to encourage engagement.

## SCREEN D: EVENTS & ATTENDANCE (FR4)

- **Event Feed:** Cards showing Event Title, Time, Location, and can tap on each one to open up a view to see more information.

- **One-Tap Action (FR4.2):** Each card must have a prominent "Join" button.

  - **"Ping Non-Responders" Button:** A specific button to send reminders only to those who haven't interacted.

## SCREEN E: ASSET MANAGEMENT (FR5)

- **Inventory Grid:** Cards representing assets (Remote, Key, Mic).

- **Visual Status (FR5.1):**

  - **Available:** Green Dot + "Borrow" Button.

  - **In Use:** Red Dot + Display "Held by [Student Name] since [Time]" (FR5.4).

- **Audit Log:** A "History" tab showing a timeline of who borrowed/returned items to trace responsibility.

## SCREEN F: CLASS FUND TRANSPARENCY (FR6)

- **Digital Ledger UI:**

  - **Big Balance Display:** "Total Fund: 5,000,000 VND".

  - **Debt List (FR6.3):** A list titled "Unpaid Members". Each row shows Student Name and Amount Due. This creates positive peer pressure.

  - **Transactions:** List of Income (Green Arrow) and Expense (Red Arrow).

  - **Evidence:** Expense items must have a small "Receipt Icon" indicating an attached invoice image.

# 3. INTERACTION & UX (NFR3 - 3 Click Rule)

- Ensure all main actions are accessible within 1-2 taps from the main screen.

- Use Toast Notifications for success states.

- Use Modal Bottom Sheets for secondary actions (e.g., confirming task completion, viewing detailed asset history).
