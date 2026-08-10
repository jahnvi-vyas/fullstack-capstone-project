# GiftLink User Stories

## User Story Template

### Title
[Short description of the feature]

### As a
[Type of user]

### I want to
[Action or functionality]

### So that
[Benefit or reason]

### Acceptance Criteria
- [ ] The functionality is available to the user.
- [ ] User input is validated.
- [ ] Appropriate success and error messages are displayed.
- [ ] The functionality works correctly with the backend API.
- [ ] The data is stored or retrieved correctly from MongoDB.

---

# GiftLink User Stories

## 1. User Registration

**As a** new user  
**I want to** register for a GiftLink account  
**So that** I can use the application to list and find free household items.

### Acceptance Criteria
- User can enter first name.
- User can enter last name.
- User can enter email.
- User can enter password.
- User receives an appropriate error if the email is already registered.
- Successful registration logs the user into the application.

**Label:** new

---

## 2. User Login

**As a** registered user  
**I want to** log in to my GiftLink account  
**So that** I can access my account and application features.

### Acceptance Criteria
- User can enter email and password.
- Backend validates the credentials.
- JWT authentication token is generated after successful login.
- User is redirected to the application after successful login.
- Appropriate error is displayed for invalid credentials.

**Label:** new

---

## 3. Create Gift Listing

**As a** registered user  
**I want to** create a gift listing  
**So that** other users can find household items that I want to give away.

### Acceptance Criteria
- User can provide item details.
- User can select an item category.
- Item is saved in MongoDB.
- Newly created item appears in the gift listing.

**Label:** backlog

---

## 4. View Gift Details

**As a** user  
**I want to** view detailed information about a gift  
**So that** I can decide whether the item is suitable for me.

### Acceptance Criteria
- User can select a gift.
- Application displays item details.
- Application displays category information.
- Application displays available comments/reviews.

**Label:** backlog

---

## 5. Search Gifts

**As a** user  
**I want to** search for available gifts  
**So that** I can quickly find items I am interested in.

### Acceptance Criteria
- User can search for an item.
- Search results are displayed.
- User can filter results by category.
- No-result searches are handled appropriately.

**Label:** new

---

## 6. Update User Profile

**As a** registered user  
**I want to** update my profile information  
**So that** my account information remains current.

### Acceptance Criteria
- User can update profile information.
- Backend validates the submitted information.
- Updated information is saved in MongoDB.
- User receives an authentication token after a successful update.

**Label:** backlog

---

## 7. Add Comments or Reviews

**As a** user  
**I want to** add comments or reviews to a gift listing  
**So that** I can share useful information with other users.

### Acceptance Criteria
- User can submit a comment/review.
- Comment is associated with the appropriate gift.
- Comment is saved in the database.
- Existing comments can be displayed.

**Label:** new

---

## 8. Logout

**As a** logged-in user  
**I want to** log out of my account  
**So that** my session is securely ended.

### Acceptance Criteria
- Logout removes the authentication token from session storage.
- User is marked as logged out.
- User is redirected to the application page.
- Login and registration options are displayed again.

**Label:** new

---

## 9. Technical Debt

**As a** development team  
**I want to** maintain clean and standardized code  
**So that** the application remains easy to maintain and deploy.

### Acceptance Criteria
- JavaScript code passes linting.
- Unused variables are removed.
- Coding standards are followed.
- GitHub Actions successfully runs the linting workflow.

**Label:** technical debt