Perfect. I’ll write a detailed Product Requirements Document (PRD) and implementation plan for the Raito web portal MVP. This will include the core features for the block explorer, STARK proof visualization, and a strong emphasis on Bitcoin-themed branding, modern UI/UX, and smooth verification flow using mocked data. I’ll also outline the sections for developer tools and APIs as future roadmap items.

I’ll get started and will update you shortly with the full document.


# Raito Web Portal MVP – Product Requirements Document & Implementation Plan

## Overview & Vision

The **Raito Web Portal MVP** is a sleek, Bitcoin-themed web application for **trustless verification** of Bitcoin blockchain data using STARK proofs. It will allow users to explore Bitcoin blocks and verify block headers or transaction inclusion with succinct zero-knowledge proofs, all through an elegant, minimalistic UI. **Raito** is a zero-knowledge Bitcoin client (written in Cairo) that generates STARK proofs for Bitcoin’s chain state, inspired by StarkWare’s ZeroSync project. This portal serves as the visual interface to that concept – demonstrating how one can **“Don’t trust, verify”** in practice using STARK proofs.

> **Note:** The MVP will use **mocked data** and **simulated proof verification**. No actual cryptographic proof verification or real-time blockchain sync occurs in this version – it’s a front-end demo showcasing the full user flow and polished UX, to be deployed at **raito.wtf**. The focus is on demonstrating the potential of trustless verification (via STARK proofs) with an outstanding user experience, rather than implementing the backend logic in full.

## Objectives and Scope

**Product Goals:**

* **Demonstrate Trustless Verification:** Show how Bitcoin block headers and transactions can be verified with STARK proofs, eliminating the need for trust in a full node. The portal should visually convey the security (e.g. lock icons indicating verified status) analogous to a browser’s HTTPS lock.
* **Provide Core Explorer Functions:** Allow users to browse recent blocks, view block details (height, hash, transactions count, fees, etc.), and confirm whether a transaction or block hash is included in the canonical chain.
* **Showcase UX Polish:** Deliver a top-notch UI with Bitcoin-themed branding (black/gold/orange palette) and intuitive interactions. Visual and interaction design is a top priority – the site should feel modern, responsive, and engaging.
* **Educate and Attract Developers:** Include placeholders for developer tools or API references to hint at future functionality. This positions the portal as not just a toy, but a starting point for real tools (even if in MVP these sections are non-functional).

**In-Scope (MVP Features):**

* **Landing Page / Hero Section:** A striking landing page with Bitcoin-themed branding and key messaging (e.g. *“Don’t trust, verify (with STARK proofs)”*). This page introduces the portal’s purpose and invites users to explore.
* **Block Explorer (List):** A minimal block explorer showing a list of recent Bitcoin blocks. Each block entry displays core metadata (block height, hash, number of transactions, total fees, timestamp) and a **verification status icon** (a padlock indicating proof verification status).
* **Block Detail View:** A detailed page for each block, showing full metadata (block height, full block hash, previous hash, number of transactions, total fee, timestamp, etc.) and STARK proof info. Users can **download the STARK proof file** for that block and see a visual status (e.g. a green locked icon if the proof is valid). A **“Verify Locally”** button lets users trigger a **local verification simulation** in-browser.
* **Transaction Inclusion Checker:** A tool for users to query if a specific Bitcoin transaction (by TXID) is included in the blockchain. The user enters a TXID and the portal responds whether that transaction exists in the (mocked) chain and in which block.
* **Block Header (Hash) Checker:** A tool to verify if a given block header hash is part of the canonical Bitcoin chain. Users input a block hash and get confirmation if it’s in the main chain (with the corresponding block height), or a “not found” result otherwise.
* **Local Verification Simulator:** A front-end simulation of verifying a STARK proof. For example, when triggered (for a block or transaction proof), it might animate a verification process (without performing real crypto) and then display a success/failure outcome. This demonstrates how instant, trustless verification *would* look and feel.
* **No Authentication / Open Access:** All features are accessible without login. The MVP is entirely open to all users (node operators, developers, researchers, enthusiasts).
* **Deployment:** The app will be deployed at **`raito.wtf`** (likely a static deployment or simple hosting, given no server-side component in MVP).

**Out of Scope (MVP):** Actual STARK proof generation or cryptographic verification, live data from the Bitcoin network (the MVP will use a fixed set of sample block and transaction data), user accounts, any form of write actions (no transactions broadcasting, etc.), and comprehensive block explorer features like mempool, address balances, etc. These can be considered for future iterations.

## Target Users & Use Cases

* **Node Operators:** Curious full node operators who want to see how a STARK-verified light client might work. They use the portal to verify block integrity quickly without running a full node, exploring the idea of **fast initial block download** with proofs.
* **Developers & Researchers:** Bitcoin developers, Layer-2 / protocol researchers, and StarkNet/Cairo developers. They will explore the portal to understand how proof-based verification is presented. They might download proofs or use the (future) API. The portal’s developer-centric touches (e.g. data in monospaced font, links to GitHub) will cater to them.
* **Bitcoin Enthusiasts:** Tech-savvy users and Bitcoin maximalists who follow the *“don’t trust, verify”* ethos. They will try out checking if known transactions or blocks are verified by the portal, gaining confidence in the concept of trustless verification. The portal should impress them with its speed and visual clarity.
* **New Users (Secondary):** While not a primary target, a well-designed UI means even casual users or newcomers curious about Bitcoin proofs can navigate it. The landing page should be welcoming and informative (hero messages, perhaps a one-liner explanation of STARK proofs).

Each of these users values **accuracy and trustlessness**. The portal should clearly communicate when something is verified by proof versus when it’s not, enabling users to independently verify chain data in a user-friendly way.

## User Experience & Design Guidelines

&#x20;*Example: The Raito project logo embodying the bold black-and-gold Bitcoin theme.*

The design of the Raito portal will strongly reflect a **Bitcoin-centric identity** with a modern, futuristic twist. The UI/UX should immediately signal “Bitcoin” and “security” while remaining clean and highly usable.

* **Color Scheme:** Predominantly **black** or dark background (evoking a command-line or deep tech feel), with **vibrant orange/gold accents** – inspired by the Bitcoin logo’s orange hue and the idea of digital gold. High contrast is key: bright highlights (orange, gold, white text) on dark backgrounds for an electric, modern feel. Interactive elements (buttons, icons) could use orange or golden glow effects to stand out.
* **Typography:** Use **Inter** for primary UI text (a clean, modern sans-serif for legibility) and **JetBrains Mono** (or another monospaced font) for any numeric or hash data to convey a technical vibe. For example, block hashes and transaction IDs should appear in a monospaced font, underlining their immutability and tech nature.
* **Imagery & Iconography:** Leverage Bitcoin iconography and cryptographic motifs:

  * A **padlock icon** to represent verification status (locked = verified secure, unlocked or warning if not verified). This icon should appear next to blocks or transactions that have proofs. The lock analogy is similar to the HTTPS lock in browsers conveying trust.
  * **Bitcoin logo/B symbol** subtly integrated (e.g., in the header or as a watermark).
  * **Nodes/Network graph motifs:** possibly as background illustrations (faint connected dots or circuits) to imply a network of nodes or Merkle trees.
  * **Hashes/hex visuals:** e.g., a string of hex digits running in the background or in section dividers, to emphasize the blockchain hash nature.
* **Hero Section Messaging:** The landing page should prominently display rallying cries of the project:

  * “**Don’t trust, verify (with STARK proofs)**” – the classic Bitcoin motto augmented to highlight STARK technology.
  * “**Sync your Bitcoin node within a minute**” – emphasizing the speed of using validity proofs for IBD (initial block download).
  * “**Blazing fast light client verification — trustless**” – highlighting both speed and trustlessness.

  These could be displayed as rotating headlines or as a bold tagline with subtext. They immediately communicate the portal’s value proposition.
* **Layout & Spacing:** Favor a **minimalistic layout**. The interface should avoid clutter – for example, a simple top navigation bar, a clear content section for lists or forms, and a footer. Use ample spacing and clean delineations (perhaps subtle dividers or cards) to group content. Each screen (block list, block details, checkers) should present one primary focus at a time to avoid overwhelming the user.
* **Visual Emphasis on Verification:** Use color and animation to draw attention to verification status:

  * A **verified proof** could be indicated by a **green or gold lock icon** and maybe a label “Verified”. If a proof (in future real data) was invalid or missing, an unlocked or red lock would show “Unverified”. In the MVP (with mocked data), assume all showcased blocks are verified (locked).
  * When the user triggers a verification (via the simulator), animate the lock or an indicator (e.g., the lock could transition from unlocked to locked with a smooth animation, or a small **checkmark** could appear with a fade-in).
* **Animations & Micro-interactions:** Subtle, futuristic animations will set the portal apart:

  * **Lock Transition:** As mentioned, an animation when verifying a block – e.g., a padlock icon swinging shut or a glowing ring forming around a lock.
  * **Hash “Flicker”:** When showing a hash (block hash, transaction ID), the text could have a brief “hex rain” effect on page load – characters cycling through random hex values before settling, giving a feeling of cryptographic computation happening.
  * **ZK Spiral Animation:** A decorative element like a spiraling shape or halo that could represent a zero-knowledge proof’s complexity made elegant. Perhaps used in the background of the hero section or on a verification success modal. It should be subtle (not distracting) but reinforces the cutting-edge cryptography vibe.
  * Use CSS and Tailwind utilities for transitions (e.g., hover states that slightly glow or move) to make the app feel alive and responsive to user actions.
* **Responsive Design:** Ensure the design is mobile-friendly. On smaller screens, the layout may collapse (e.g., the block list becomes a vertical list with key info, and details use accordion sections). The high contrast should help mobile readability. Touch targets (buttons, input fields) should be appropriately sized.
* **Accessibility:** Maintain good contrast (likely achieved with the chosen palette), add alt text for icons (e.g., lock icon should have alt “verified lock icon”), and allow keyboard navigation (important for the form fields on checkers).
* **shadcn/ui Components:** We will utilize components from **shadcn/ui** (a Tailwind + Radix UI library) for consistency and quality. Pre-built components like buttons, inputs, tables, dialog (for any modals) will accelerate development while ensuring a modern look and feel out-of-the-box, which we will customize with our theme (e.g., applying the black/gold style).

In summary, the UI/UX design must exude **trustlessness, speed, and modernity** – a fusion of Bitcoin’s branding with a futuristic, high-tech ambiance. Users should feel like they’re interacting with a next-generation Bitcoin interface that is **both** visually appealing and obviously security-focused.

## Functional Requirements

### 1. Landing Page (Hero)

**Description:** The landing page is the entry point showcasing Raito’s mission and guiding users to the explorer or tools. It features a hero section with a bold background (dark with possibly a Bitcoin or cryptographic motif) and the key hero messages mentioned above.

**Requirements:**

* A clear **headline** (e.g., “Don’t trust, verify”) and a brief explanatory subheading (e.g., “Explore Bitcoin with STARK proofs for instant, trustless verification.”).
* A visually engaging backdrop – could include the **ZK spiral animation** or a faint Bitcoin logo outline – to create drama.
* **Call-to-Action (CTA):** Button(s) that scroll or navigate to the Block Explorer section or tools. For instance, a “Explore Blocks Now” button that jumps to the blocks list on the page or navigates to the Block Explorer page.
* Possibly a quick overview of features in an eye-catching way (e.g., three icons with labels: one for “Block Explorer + Proofs”, one for “Transaction Inclusion Check”, one for “Header Verification”), which gives users a hint of what they can do.
* Ensure the landing page fits in one screen (with perhaps scroll for more), especially on desktop, so that the primary message isn’t lost.

**Interaction Design:** If the page scrolls, the nav bar can become sticky after the hero, making it easy to access other sections (blocks, tools). The CTA button on hero should have a hover effect (glow or slight movement) to invite clicking.

### 2. Block Explorer (Blocks List View)

**Description:** A page or section that lists recent Bitcoin blocks with essential info and verification status. This is akin to a simplified blockchain explorer focused on block headers and proof status.

**Requirements:**

* **List of Blocks:** Display a list (or table) of the latest N blocks (e.g., 10-20 blocks) from the mock dataset. Each block entry should include:

  * *Block Height (Number)* – e.g., “#810,000”.
  * *Block Hash (ID)* – truncated for display (first and last 4-6 chars with ellipsis in middle) unless clicked or hovered to show full.
  * *Number of Transactions* – e.g., “Txns: 1,234”.
  * *Total Fees or Reward:* e.g., “Fees: 0.123 BTC” (if such data is in mock; or could be block reward 6.25 BTC + fees).
  * *Timestamp:* a human-readable time or time ago (e.g., “10 minutes ago”).
  * *Verification Status:* a **lock icon** indicating if the block’s proof is verified. All blocks in MVP will show as verified (locked in green/gold). If we include an example of an unverified one, it could show an open lock or warning icon.
* The list should be sorted by height (newest at top). Optionally, include a search or input to jump to a specific block height or hash (not strictly required for MVP, but nice if easily implemented with the static data).
* Each block entry is **clickable**, linking to the **Block Detail** page for that block. The hover state should indicate it’s clickable (e.g., highlight row or change background).
* Use a **responsive table or card layout**. On desktop, a table with columns can be used (utilizing shadcn/ui Table component styled with our theme). On mobile, it might collapse to cards or a simpler list (perhaps just height, an icon, and a “View details” link).

**Interaction Design:** Clicking a block entry navigates to the block detail page. If a user hovers on a block hash, consider showing a tooltip with the full hash. The lock icons should have an accessible tooltip or alt text (“Verified by STARK proof”) to reinforce what it means.

### 3. Block Detail Page

**Description:** A dedicated page for detailed information about a specific block, including its metadata and the attached proof verification details.

**Requirements:**

* **Block Metadata Display:** Clearly show the block’s details:

  * Height (as a prominent title, e.g., “Block #810,000”).
  * Full Block Hash.
  * Previous Block Hash (maybe with a link to that block’s detail for navigation).
  * Number of Transactions.
  * Total Fees in the block (and possibly block reward if desired, or just fees).
  * Timestamp (exact date-time).
  * \[Optional] Merkle root or bits/nonce – not critical for MVP, likely omit to keep it minimal.
* **Proof Status & Controls:** A section highlighting the STARK proof verification:

  * A **lock icon + label** indicating the status (in MVP, “Verified”). For instance, an icon followed by text “STARK Proof Verified ✓” in green/gold styling.
  * A **Download Proof** button or link. This allows the user to download the proof file (e.g., `block_810000_proof.json` or similar) from the mock data. The link will point to a static file bundled with the site. If actual file is not available, it can trigger a dummy download of a text file placeholder.
  * A **“Verify Locally” button** – clicking this will initiate the **verification simulator**.

    * On click, the UI might show a small modal or an in-page alert: e.g., “Verifying proof...” with an animated spinner or progress bar. After a 1-2 second delay, it will display a success message (e.g., a green checkmark and “Proof Validated! This block is verified.”).
    * If designing an elaborate animation: perhaps a mini-animation of the padlock locking or a spiral contracting into a checkmark.
    * The button could then change to a “Verified ✓” state or be disabled after simulation to indicate completion.
* **Transaction List (Simplified):** *Optional:* We may include a very minimal list of transaction IDs included in the block. However, since focus is on headers and proof, this might be skipped for MVP to avoid clutter. If included, it could be a collapsed section the user can expand (“View transactions”) showing a list of TXIDs (with each truncated and maybe linked to some generic explorer or just text). For MVP, it’s acceptable to not list all transactions to keep things simple.
* **Navigation:** A back link to the Block Explorer or a small navigation element to jump to previous/next block (if data available) could be included for convenience. At minimum, a “Back to blocks” link or button should be somewhere.

**Interaction Design:** The “Verify Locally” process should be engaging – e.g., use a modal overlay to focus user attention during the simulation, and prevent other interaction until it finishes (since it’s just a moment). After verification simulation, the result could be shown in the same area (perhaps replacing the button with a success state). Download button should give immediate feedback (the file download or opening a save dialog). All icons and important text should have tooltips for clarity (e.g., on hovering the lock icon text “This block’s STARK proof has been verified”).

> **Design Emphasis:** The Block Detail page is where **trustlessness** is most directly communicated. Prominently display the proof verification status – it should dominate the user’s attention more than raw block data. This assures the user that “this block is secure and verified by a STARK proof” at a glance.

### 4. Transaction Inclusion Checker

**Description:** A page or section where users can input a Bitcoin transaction ID (hash) and check if that transaction is included in the (mock) blockchain, and by extension, is covered by a STARK proof.

**Requirements:**

* **Input Field:** A text input that accepts a transaction ID (a 64-character hexadecimal string). It should be labeled clearly (e.g., “Transaction ID” or “TXID”).
* **Action Button:** A button labeled “Check Inclusion” or simply an enter key trigger to submit the query.
* **Result Display:** After submission, the system searches the mock data for that TXID:

  * If **found**: Display a positive result, e.g., “✅ Transaction **<txid truncated>** is included in Block #<height>.” Include the block height (and possibly link that height to the Block Detail page). Also show the verification status of that block (for MVP, all blocks are verified, so implicitly the transaction inclusion is verified by the proof). For clarity, we can add text like “This means the transaction is part of the canonical chain and covered by a STARK proof.”
  * If **not found**: Display a message, e.g., “❌ Transaction not found in the canonical blockchain (or not in our dataset).” Possibly suggest checking the TXID or note it might not have been included.
  * If input is invalid (not 64 hex chars): Show a validation error like “Please enter a valid 64-character transaction hash.” (This validation can be done client-side instantly).
* **User Guidance:** Provide a short description or hint above the input: “Enter a transaction ID (hash) to verify if it’s included in the Bitcoin blockchain (per the latest known block).” This sets context that we are checking inclusion in the chain.
* The design can be simple: the input and button could be centered on the page, with the result appearing below. Use the monospaced font for the TXID in results to stand out.

**Interaction Design:** On clicking the check button, if possible, provide immediate feedback (e.g., disable the button and show a small spinner in it or near it while “searching”). Given the dataset is local, the response will be instantaneous, but a brief spinner can make the process feel deliberate. Once result is shown, perhaps allow another check (maybe the result stays and a new query can overwrite it). The page should handle multiple queries in one session gracefully (e.g., each new search replaces the old result or appends a new result message list).

### 5. Block Header Hash Checker

**Description:** A similar tool to the TX checker, but for verifying if a given block header (block hash) is part of the main chain.

**Requirements:**

* **Input Field:** Text input for the block hash (also 64-character hex).
* **Action Button:** “Check Block” or “Verify Header” button to submit.
* **Result Display:** After submission, check the mock blockchain data for that hash:

  * If **found**: Show “✅ Block <hash truncated> is in the canonical chain at height #<height>.” Possibly also show that it’s verified by a proof (since all blocks in MVP have proofs) – e.g., add “(STARK proof verified)”. Provide a link to view that block’s details.
  * If **not found**: “❌ No block with that hash in the canonical chain (it may be invalid or from a fork).”
  * If invalid input (not 64-char hex): error message “Enter a valid 64‑character block hash.”
* **Context:** Above the input, explain: “Enter a block hash to check if it’s part of the main Bitcoin blockchain.” This implies an *honest chain inclusion check* which is relevant for those verifying data from untrusted sources.
* Design and layout similar to the TX checker for consistency: simple form, central alignment, clear text. We could combine the TX and block checkers into one page with tabs or sections, but for MVP clarity, separate pages/sections is acceptable.

**Interaction Design:** Same considerations as the TX checker (loading indicator, result messaging). For usability, if the user came to this page via a link (maybe from the nav), ensure it’s clear what to input (could even provide an example hash in placeholder text). After a result is shown, if it’s positive with a link to block, the user should be able to click that to go to the Block Detail, so ensure that works and perhaps opens in a new tab or same tab as appropriate.

### 6. Local Verification Simulator

**Description:** The “local verification” feature appears primarily on the Block Detail page (and potentially could be used for transaction inclusion proofs as well). It simulates the process of verifying a STARK proof in-browser, reinforcing the *“trustless”* aspect by showing that verification can be done on the client side (in principle). In MVP it’s not real, but the UI/UX should reflect what a real process might feel like.

**Requirements:**

* **Trigger:** Typically a button (e.g., “Verify Locally”) on a page with proof data (like Block Detail).
* **Simulation Behavior:** When triggered:

  * Disable the trigger button (to prevent repeat clicks) and change its label/state to “Verifying...” with a spinner icon or animation.
  * Optionally, open a small modal or overlay a semi-transparent layer to indicate a process in action (not too intrusive, maybe just the button and an animated icon suffice).
  * After a short delay (configurable, say 2 seconds to simulate computation), display the result:

    * **Success scenario (expected):** Show a checkmark icon and text like “Proof verified successfully!” Possibly in a green or gold highlight. If using a modal, this could be the modal content; if inline, it could replace the button.
    * **Failure scenario (if we choose to simulate one, though not necessary in MVP if all proofs are valid):** Would show a red X icon and “Verification failed: proof invalid.” (This might not be utilized in the happy-path demo, but we could include the logic for completeness or future).
  * Close the simulation state: If a modal was used, provide a button to “Close” or auto-close after a moment. If inline, maybe allow the user to run it again (though typically verifying again isn’t needed; we might simply leave the success message in place).
* The simulation does not require any input from the user beyond clicking the trigger. It uses data already present on the page (the proof attached to the block). We might include a mock progress indicator (like “Step 1/3: Validating proof structure... Step 2/3: Checking cryptographic validity... Step 3/3: Verified!”) as a bit of educational flair during the 2-second process.

**Interaction & Design:**

* **Feedback is crucial** – the user should clearly see something happening when they click verify. A nice touch: transform the verify button into a progress bar (with the button background filling up) or into a spinning icon.
* Use text or visuals to reinforce *what* is being verified. E.g., the modal could say “Verifying STARK proof for Block #810,000...” so the context is clear.
* If this simulation is also accessible elsewhere (for example, maybe in the future a transaction inclusion proof verification), the same component/behavior can be reused.
* Keep the experience quick; since it’s fake, don’t simulate a very long wait. 1-3 seconds is enough to give a sense of “work done” without annoying the user.
* On success, besides a textual confirmation, the lock icon on the page (if it was in an “unverified” state prior) could animate into a “locked” state. In MVP all blocks are already verified from the get-go, so this might not change state; but if we hypothetically had a scenario where a block detail showed “Not verified” until user clicks “Verify Locally”, then the lock would switch to locked upon success.

> **Interaction Example:** When a user clicks **Verify Locally**, the portal could display a short animation – for instance, a padlock icon swinging shut or a series of hash characters quickly cycling – then show a **“Proof Verified!”** message with a green checkmark. This gives the user tangible feedback that cryptographic validation (albeit simulated) has taken place, mirroring the ethos of *client-side verification*.

### 7. Navigation & Footer

While not a “feature” per se, having clear navigation and a useful footer will improve overall UX and convey project identity:

* **Top Navigation Bar:** A simple top nav that remains consistent across pages. It could include:

  * The **Raito** logo or name (clickable to go back to home/landing).
  * Links to key sections: “Explorer” (blocks list), “Verify TX”, “Verify Block” (or “Tools”), and possibly “Developers” (if we have those placeholder pages).
  * Use a sleek design, maybe transparent or dark background. On scroll, it can become a solid color for readability.
  * For mobile, a hamburger menu can collapse the links.
* **Footer:** A persistent footer with:

  * A brief tagline or mission statement (“Raito – Bitcoin light client with STARK proofs. Don’t trust, verify.”).
  * Links to resources: e.g., **GitHub repository** (open-source code), **Protocol Docs/Whitepaper** (if any, or link to ZeroSync info for now), **Contact or Twitter** if relevant.
  * Possibly the Raito and/or StarkNet logo. Use small icons for any external links.
  * A note that it’s an open-source project, maybe the license, and the deployment (for transparency).
  * Styled in the dark theme, perhaps with a gold/orange accent for link hovers.
* Ensure the footer is not too tall; keep it compact so as not to distract, but distinct enough as the end of page.

### 8. Developer Tools / API Reference (Placeholder Sections)

**Description:** Although the MVP does not implement real developer tools, we want to include placeholder pages or sections to foreshadow features for developers (which aligns with target users like developers and researchers).

**Requirements:**

* Perhaps in the nav or somewhere on the landing, have a section or links for “Developers” or “API”. These will lead to static pages with some placeholder content.
* **Dev Tools Page (Design Only):** This could showcase what might be coming. For example, a page that lists:

  * “Proof API: Query proofs via REST/GraphQL” – with a dummy code block example (using JetBrains Mono font) of an API call like `GET /api/proof?block=810000`.
  * “CLI Tools: Verify proofs on your node” – an example command snippet like `raito-cli verify block_810000.proof`.
  * These are just text/info; clearly mark them as **Coming Soon** or **Placeholder** so users don’t attempt to use them yet.
* **API Reference Page (Design Only):** Similar approach – maybe formatted like documentation, showing potential endpoints or developer instructions. Could use a markdown renderer or just static HTML for now.
* The purpose is to signal that Raito will provide programmatic access and tools, increasing credibility that this isn’t just a toy UI but part of a larger project.

**Design:** Use consistent styling for these pages, possibly a simple two-column layout (menu on left with sections, content on right) if mirroring a docs site structure. Or keep it simple with headers and code blocks. The key is to make it look intentional and not empty:

* Include some placeholder text like “Under active development” or an invitation to contribute on GitHub.
* Since this is design-only, no functional links or actual data calls needed.

---

## Tech Stack & Architecture

* **Framework:** **Next.js** (React) will be used for building the frontend. This gives us a structured React framework with routing and deployment ease (likely deploying as a static site or using Vercel for raito.wtf).
* **Language:** **TypeScript** for type-safe frontend development.
* **UI Library:** **React** components with **shadcn/ui** (a set of pre-built Tailwind + Radix UI components) will serve as the base for UI elements (forms, buttons, tables, modals). This ensures consistent styling and accessibility out of the box.
* **Styling:** **TailwindCSS** for utility-first, responsive styling. We will configure a custom theme in Tailwind for the color palette (Bitcoin orange, gold, etc.) and include the custom fonts (Inter, JetBrains Mono) via Google Fonts or local assets.
* **Icons:** Likely using an icon set (such as Heroicons or FontAwesome) for things like the lock icon, checkmark, etc., integrated as React components or SVGs.
* **State Management:** Minimal – the app is mostly static data. We can use React’s built-in state or simple context if needed (e.g., to pass around the block data). No complex global state management required for MVP.
* **Data Handling:** The Bitcoin block and transaction data for the demo will be mocked, possibly stored as JSON files. For instance, a JSON file containing an array of the latest blocks with fields \[height, hash, tx\_count, fees, timestamp, and maybe an array of txids]. This can be imported or fetched locally by the Next.js app. Transaction lookup can be done by scanning this data or using a pre-built index (e.g., a Map of txid->block height).
* **Performance Considerations:** Since all data is mocked and small, performance will be excellent by default. Next.js can pre-render pages (maybe use static generation for the list and each block detail if we treat the mock as the source). We should ensure images (like any background graphics) are optimized and use Next’s `<Image>` component if needed. Animations should be efficient (CSS-based mostly).
* **Security:** No user input touches a server in MVP (all checks are client-side), so attack surface is low. Still, we’ll validate inputs on the client side to avoid any weird behavior (even though no backend). The site should be served over HTTPS (especially given the theme of security).
* **Deployment:** Target deployment on **raito.wtf** – likely using a static hosting or Vercel. Ensure to set up proper meta tags (title, description) to explain the site when shared.

## Implementation Plan

Following is a step-by-step plan to implement the Raito Web Portal MVP. The implementation is broken down by screens/components as well as general setup tasks, in a logical development sequence:

1. **Project Setup:**

   * Initialize a new Next.js project with TypeScript. Configure TailwindCSS and integrate **shadcn/ui** components library (install the library or copy needed components).
   * Add the Google Fonts for **Inter** and **JetBrains Mono** in the project (e.g., via `<link>` in `_document.js` or using Tailwind’s font plugin). Configure Tailwind theme with the **color palette** (define black, orange, gold shades, etc.) and font families (`sans: 'Inter', mono: 'JetBrains Mono'`).
   * Setup a basic layout in Next.js: create a main `<Layout>` component that includes the **Navigation bar** and **Footer** so these wrap all pages consistently.
   * Verify the development environment is working (run the dev server, test hot-reloading, etc.).

2. **Implement Global UI Components:**

   * Create the **Navigation Bar** component with the Raito logo and links (Home, Explorer, Verify TX, Verify Block, Developers). Use a Tailwind CSS flex container for layout. Ensure it’s responsive (collapse to a menu on small screens).
   * Create the **Footer** component with the content discussed (links to GitHub, tagline, etc.). Use Tailwind grid or flex to arrange items. Test its appearance on different screen sizes.
   * Define styles for key elements: e.g., a CSS class or Tailwind utility combo for the lock icon states (maybe `.text-green-500` for verified, `.text-red-500` for unverified, etc.), for buttons (perhaps use shadcn’s button component classes with our color overrides), and for section headers.
   * Set up the **Icon library** usage (import lock, check, X icons from a library or as SVGs).

3. **Landing/Hero Page:**

   * Create the **Home page** (`pages/index.tsx` in Next.js). Implement the Hero section:

     * Include the headline and subheader text as per design. Style with large font sizes, bold weight for headline.
     * Place the call-to-action button that links to the Explorer page (`/explorer` route, to be created).
     * Add background styling: perhaps a full-bleed div with a dark background. If using an image or SVG (like a Bitcoin logo outline or abstract graphic), insert it with CSS `background-image` or an `<Image>` component (make sure to optimize or use low opacity so text is legible).
     * If implementing an animation (like the “hash flicker” on the headline text or a floating animation for an icon), include the necessary CSS or small script.
   * Below the hero, optionally add a features overview section (e.g., three columns each with an icon and short text for Explorer, Inclusion Check, Verification). This gives users quick insight if they scroll.
   * Test the hero on mobile (the text might need to scale down, and the layout might need centering).

4. **Block Explorer List Page:**

   * Create a page at route **`/explorer`** (or could be the same home page below hero section). This page will fetch or import the **mock block data**.

     * Prepare a JSON file (e.g., `data/blocks.json`) containing an array of block objects. Include \~5-10 recent blocks for demonstration.
     * Each block object includes: height, hash, txCount, totalFees, timestamp, maybe prevHash, and a list of txids (if needed for detail). Since the explorer is minimal, including prevHash and txids is optional (txids could be heavy; might skip storing all).
   * In the Explorer page component, load the data (e.g., via `import blocks from '../data/blocks.json'` or an API route that returns it).
   * Use a **Table component** from shadcn/ui or simply a `<table>` with Tailwind classes to layout the block list:

     * Header row: “Height”, “Hash”, “Transactions”, “Fees”, “Time”, “Status”.
     * Rows: map over the block data to populate cells. Format the data as needed (e.g., time as “X minutes ago” – can use a library like dayjs or just hardcode since data is static).
     * For Status cell: insert a lock icon element. If we have a boolean `verified` in data, use it; otherwise assume true for all and display the locked icon with a tooltip “Verified by STARK proof”.
   * Make each row clickable: wrap the row in a `<Link>` to `/block/[height]` or add an onClick that navigates using Next/router.

     * Alternatively, have a dedicated “View” button on each row if that’s clearer on mobile.
   * Style the table: apply Tailwind classes for borders, hover highlight (e.g., `hover:bg-gray-800` on row), padding, etc. Ensure the design matches the dark theme (maybe use a semi-transparent white text for less important info, bright text for important).
   * Test on various screen widths. Possibly implement a mobile view fallback: e.g., hide some columns on small screens or convert each row to a card (stacking the data vertically). This can be done with CSS @media or Tailwind’s responsive utilities (like `hidden md:table-cell` on certain cells).

5. **Block Detail Page:**

   * Define a dynamic route **`/block/[height].tsx`** in Next.js to handle each block detail by height (or could use hash, but height is user-friendly).
   * In `getStaticPaths`/`getStaticProps` (if using Next.js SSG) or in the page component (if loading data on client), fetch the block data corresponding to the height from the same mock dataset.
   * Layout the block detail:

     * Top of page could say “Block #Height” as a heading.
     * Use a two-column grid or flexbox: one side for the metadata list, the other side for the proof info – or simply a single column stack if that looks better.
     * Metadata can be displayed as a list of key-value pairs (could use a definition list `<dl>` or just paragraphs). E.g., **Hash:** `00000000abc...def`, **Prev Hash:** `00000000...1234` (link prev), **Transactions:** 1234, **Fees:** 0.5 BTC, **Timestamp:** 2025-01-01 12:34:56.
     * The proof section: big lock icon with text. Under it, the **Download Proof** button (use a Button component styled in orange perhaps) – link it to a file in `public/` or use Next’s static file serve. And the **Verify Locally** button (another styled button).
   * Implement the **Verify Locally** button’s behavior:

     * Use React state to track verification state. Initially, `status = idle`.
     * On click, set `status = 'verifying'`; perhaps trigger a re-render that conditionally shows a <VerificationModal> or just changes the button text.
     * After a `setTimeout` of \~2 seconds, set `status = 'success'` (for MVP we assume success).
     * Conditionally render: if `status==='verifying'`, show the button disabled with spinner and “Verifying...”; if `status==='success'`, replace the button area with a success message (and maybe a reset or a check icon).
     * Ensure to also update the lock icon state if we started it as unlocked (again, in MVP we might start it locked anyway, so this is more for demonstration).
   * If including the transactions list, map over the block’s txids to show them (truncate each, possibly allow expanding). This could be a collapsible section to avoid drowning the user in data by default.
   * Add a “Back” link or button to return to the Explorer (could be above or below the details).
   * Style everything to match the theme: e.g., use `font-mono` class for the hashes, use colored icons as defined. Group related info with boxes or lines as needed.
   * Test the verify simulator thoroughly to ensure it switches states and doesn’t break navigation if the user leaves mid-process (maybe cancel the timeout on unmount if using a modal, etc.)

6. **Transaction Inclusion Checker Page:**

   * Create a page **`/tx-check`** (or integrate into a section on home). For clarity, a separate page `/tx-check` is fine.
   * Layout the form:

     * Use a Card or centered container div for the input and button. Possibly leverage a shadcn **Input** and **Button** component for consistent styling.
     * Use state to bind the input value (or utilize uncontrolled form and a submit handler).
     * On submit (button click or form submit event):

       * Validate the input format (length, hex). If invalid, set an error state (and maybe a small red-tinged message below the input).
       * If valid, search the blocks data for that TXID:

         * We might preprocess a map of txid -> block height at app start to make this efficient. Or simply loop through blocks and their tx lists (given small dataset, either is fine).
       * Determine result and set a state variable for result.
     * After submission, display the result section as described: possibly a Card or alert-style component (green for found, red for not found).

       * If found, show truncated TXID (first 6+ last 6 chars) and the block link. Use monospaced font for the hash in result.
       * If not, show a clear not found message.
     * Allow the user to make another query by keeping the input visible (could even allow multiple results to accumulate, but better to replace result on each search to keep it simple).
   * Add some extra UI niceties: e.g., a copy-paste icon in the input if we expect users copying TXIDs, or auto-formatting uppercase/lowercase hex.
   * Test with known values from the mock data (embed one real TXID from block data to test the “found” case, and a random one for “not found”).

7. **Block Hash Checker Page:**

   * Create page **`/header-check`** (or similar).
   * This will be very analogous to TX checker. We can reuse a lot of the form logic:

     * Possibly abstract a small component that takes a label and search function to avoid duplicate code.
   * Input for block hash, button to submit.
   * On submit, validate (64 hex). Then search the block list by comparing the hash field.
   * Display result: found vs not found, with messages as described.
   * Link to block if found (could be the height number clickable).
   * Testing similarly with a known block hash from the dataset.

8. **Developers / API Placeholder Pages:**

   * Create a page **`/developers`** (for general dev tools) and **`/api`** (for API reference) or a single combined page depending on how we want to structure it. Since MVP doesn’t have much content, one page might suffice with anchors.
   * Populate with static content:

     * E.g., on `/developers`: “## Developer Tools (Coming Soon)” then list some bullets or examples (maybe in code blocks). For instance:

       * **REST API:** `GET /proofs/{block_height}` – returns proof JSON *(future feature)*.
       * **JavaScript SDK:** a code snippet showing how one might use a hypothetical `raito.js` library.
       * Encourage visiting the GitHub repo for contributing.
     * On `/api`: Could outline a mock API spec with nothing actually live. Or we could merge this with dev tools page.
   * These pages should appear in the nav (maybe under a dropdown “Developers” or separate links).
   * Style them in documentation style: perhaps a narrower text column, smaller font. Use the monospaced font for code. Maybe include a code block with syntax highlighting for a sample JSON response or CLI usage.
   * Mark clearly as design prototypes (e.g., an info callout “This section is under development for a future release.”).

9. **Polish & UX Enhancements:**

   * Go through each page and refine the styling and spacing to match the intended polish:

     * Ensure consistent usage of colors and fonts. Tune the Tailwind config or utility classes if something is off (e.g., ensure the orange is the exact Bitcoin orange for accents).
     * Add any remaining **animations**: e.g., using Tailwind’s `transition` classes for hovers, keyframes for specific animations like the hash flicker (custom CSS might be needed for text scramble effect).
     * Test the responsive behavior on various device sizes, adjusting breakpoints or flex wraps as needed.
     * Add alt text for images/icons and test keyboard navigation (tab through links and forms) to catch any accessibility issues.
   * Conduct an internal review of content: are the hero messages clear? Do we need any additional explanatory text anywhere (perhaps a tooltip or info icon next to “STARK Proof” that on hover explains what a STARK proof is in one sentence)? Add those if beneficial.
   * If time permits, incorporate a **toggle for dark/light mode** using shadcn’s theme switcher – but likely not needed since the design is inherently a dark theme, we can stick to dark-only for MVP.
   * Check that all links (internal and external) work (especially the GitHub link in footer, etc.).
   * Prepare for deployment: set the site metadata (HTML `<title>`, `<meta description>` summarizing “Bitcoin block explorer with STARK proofs” for SEO/share).

10. **Deployment & Testing:**

    * Deploy the application to the target domain (raito.wtf). Likely use Vercel for simplicity: connect the GitHub repo and set custom domain. Ensure environment is production build optimized.
    * Before finalizing, do a round of testing on the live site or in a production build:

      * Test page loads for each main route.
      * Download proof link works (should download the file).
      * Simulated verification works consistently.
      * No console errors or obvious performance issues.
    * Monitor for any UI issues on deployment (sometimes differences in static paths, etc., ensure static files like proofs or images are served correctly).
    * Once verified, officially launch the MVP.

Throughout development, **visual and interaction design is the priority**. At each step, attention will be paid to the UI details (spacing, alignment, color usage, text clarity) and the feedback given to the user on each action. This ensures the final product isn’t just functionally complete but also delivers the *“wow”* factor expected from a cutting-edge Bitcoin portal.

## Conclusion

The Raito Web Portal MVP will serve as a compelling demonstration of how Bitcoin’s integrity can be verified in a user-friendly, trust-minimized way. By focusing on a polished UI/UX and the core features of block verification, transaction inclusion, and header checks (all backed by the concept of STARK proofs), this portal will effectively communicate Raito’s value proposition to the community.

Moving forward, the MVP’s solid foundation – built with modern web tech and a strong design language – will allow the project to incorporate real proof data and expanded functionality (like live blockchain data, true proof verification, and developer APIs) with relative ease. Raito’s mantra is **“Don’t trust, verify,”** and this web portal brings that philosophy to life, inviting users to experience the future of Bitcoin light clients in a visually engaging way.

**Sources:** The concept of using STARK proofs for Bitcoin validation is inspired by prior research and projects like StarkWare’s ZeroSync, which demonstrated that augmenting the Bitcoin header chain with a Merkle tree allows succinct proofs of inclusion for blocks and transactions. The Raito project itself aims to *“bring trustless validation of the Bitcoin blockchain through STARK proof verification”*, revolutionizing how quickly and securely new nodes can be bootstrapped. This PRD and implementation plan translate those ambitious ideas into a concrete, user-centric web application.
