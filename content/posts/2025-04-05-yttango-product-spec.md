---
title: "Yttango Product Specification"
date: 2025-04-05
draft: false
description: "LLM-friendly detailed spec"
tags: ["python, flask, youtube, api"]
categories: ["development", "python"]
---

This will serve as our comprehensive guide for instructing the LLM coding assistants. 

Appended to the spec: a critical analysis of the spec by Claude.

### **Yttango Product Specification: Detailed Requirements for AI-Assisted Development**

---

### **1. Product Overview**

Yttango is a web application designed for personal use to efficiently assess and manage the content of videos from YouTube playlists and channels. It achieves this by providing **AI-generated summaries and metadata**, along with **export tools** for selected videos. Users can organise videos into subject areas and export video URLs or, in future iterations, add them to a playlist on their YouTube channel. The application will store data locally in a **Postgres database**.

### **2. Key Features**

1.  **URL and Feed Management:** Input and management of individual YouTube video URLs, playlist links, and channel links. The system will automatically identify the type of link.
2.  **Video Listing and Information:** Display of videos in a grid format with key metadata: thumbnail (with click-to-play functionality), title, subject area (user-defined categories), description, publication date, channel URL, and video length.
3.  **AI Summaries and Tags:** Generation of AI summaries for each video using **Gemini 2.0**. The LLM will also generate editable tags for each video.
4.  **Transcript Access:** Expandable accordion view to display the full video transcription.
5.  **Export Functionality:**
    *   Copy video URL to clipboard button for each video with visual feedback upon copying.
    *   Future potential to add selected videos to a user's YouTube playlist (not in the initial MVP).
6.  **Subject Area Management:** Drop-down list of subject areas for categorising videos, with options to create new subject areas via a modal window. Subject areas can be pre-populated by the parent channel or playlist or default to 'general'.
7.  **Channel and Playlist Sync:**
    *   Collapsible sections in the UI to list channels and playlists.
    *   Display of channel thumbnail, name, most recent video date, number of unprocessed videos (up to 15, highlighted if >0), and a short channel description.
    *   Display of playlist thumbnail (or placeholder), name, assigned subject area, most recent video date, number of unprocessed videos (up to 15, highlighted if >0), playlist creator, and an editable playlist description.
    *   'Sync' button for both channels and playlists to pull in the latest 15 videos (or any new videos) into the main video list.
8.  **Database Management:** Local storage of all data in a **Postgres database**. Functionality to delete individual video entries or select entries to delete from the entire database.
9.  **Manual Video Addition:** Option for users to manually add individual video URLs to the database.
10. **Error Handling and Logging:** Basic error handling and event logging.
11. **Dark Mode UI:** CSS styling implemented in a dark mode theme.
12. **API Key Security:** Utilisation of a **Flask proxy server** to securely manage YouTube Data API v3 and Gemini API keys.
13. **Synchronize Feeds Button:** Before any API calls are made to the Youtube Data v3 API, and the Gemini 2.0 API, the user clicks a 'synchronize feeds' button that pulls in the most recent videos from the youtube video feeds that the user has added to the app. The feeds are the xml rss feeds from the channels and playlists that the user has previously added and are listed in the channels and playlists sections at the top of the UI grid. The feeds list key metadata of the last 15 videos in the feed. When the user clicks the 'synchronize feeds' the app only adds videos to the grid ui that have not already been added. Videos remain in the grid ui until they are either deleted or added to the postgres rag database.

### **3. Detailed Functional Requirements**

1.  **URL Input:** A prominent input field with an "ADD" button for users to paste YouTube video, playlist, or channel URLs.
2.  **Link Type Detection:** The application must automatically determine if an entered URL is for a single video, a playlist, or a channel.
3.  **Channel/Playlist Processing:**
    *   Upon adding a channel or playlist URL, the system will fetch the latest 15 videos (or fewer if there are no new videos) using the **YouTube Data API v3**.
    *   The fetched videos will be added to the main video list in the UI and stored in the database.
4.  **Individual Video Processing:** Upon adding an individual video URL, the video metadata will be fetched using the **YouTube Data API v3**, and the video will be added to the main list and the database.
5.  **Metadata Retrieval:** For each video, the application will use the **YouTube Data API v3** to retrieve: video ID, title, channel name, video length, description, publication date, and thumbnails.
6.  **Transcript Extraction:**
    *   When the user clicks the "get summary" button for a video, the application will attempt to retrieve the transcript using a **hybrid approach**:
        *   **Primary Method:** Use the `youtube-transcript-api`.
        *   **Fallback #1:** Use the **YouTube Data API v3's captions endpoint**.
        *   **Fallback #2:** Consider **client-side extraction** (implementation details to be determined).
    *   Implement **rate limiting, proxy rotation (using services like Webshare), robust error handling, and aggressive caching** for the `youtube-transcript-api` to mitigate IP blocking.
7.  **AI Summarization:** Once the transcript is successfully retrieved, it will be passed to the **Gemini 2.0 API** via the Flask proxy server for summarization. The prompt for Gemini 2.0 should request a concise summary of the video content and a list of relevant tags.
8.  **UI Display:**
    *   The main UI will present a sortable and filterable grid of videos with the aforementioned metadata.
    *   Clicking on the video thumbnail will open the video in a new tab.
    *   Each video row will include a "get summary" button (which changes state once a summary is available).
    *   An accordion component will display the full transcript when expanded.
    *   An editable text field will display the AI-generated tags.
    *   A "copy video URL to clipboard" button with visual feedback will be present for each video.
    *   A "delete" button will remove the video from the UI and the Postgres database.
9.  **Subject Area Functionality:**
    *   A drop-down menu will allow users to assign a subject area to each video, playlist, or channel.
    *   An option to add a "new subject" will launch a modal for the user to enter and save a new subject area.
10. **Database Operations:**
    *   Users can delete individual video records from the database via the UI.
    *   A function to purge the entire database will be provided (location in UI TBD).
11. **Channel/Playlist Sync Operation:** Clicking the 'sync' button for a channel or playlist will fetch the latest videos (up to 15 new ones) and add them to the main video list and the database.
12. **Error Handling:** The application should gracefully handle API errors (YouTube and Gemini), transcript extraction failures, and database errors. Basic error messages should be displayed to the user, and errors should be logged.
13. **Logging:** The application should log significant events, such as successful API calls, errors, and database operations. The specific information to be logged will be determined during development.

### **4. Technical Requirements**

1.  **Programming Language:** Python 3.13.2.
2.  **Web Framework:** Flask with blueprints for modularity.
3.  **Database:** Postgres. The schema will be deduced from the functional requirements (see section 8).
4.  **YouTube Data API v3 Integration:**
    *   Utilise specific endpoints such as `playlists.list`, `channels.list`, `videos.list`, and `captions.list`/`captions.download`.
    *   Extract data points including video ID, title, channel name, description, duration, publication date, and thumbnails.
    *   API authentication and quota management will be handled by the relevant blueprint modules via the Flask proxy server.
5.  **Gemini 2.0 API Integration:**
    *   Transcripts will be passed to the Gemini 2.0 API (specific endpoint to be determined) via the Flask proxy server.
    *   API authentication and quota management will be handled by the relevant blueprint modules via the Flask proxy server.
6.  **Transcript Extraction Library:** `youtube-transcript-api` will be used as the primary method, with fallbacks to the YouTube Data API v3 and potentially client-side extraction.
7.  **Front-End Technologies:**
    *   HTML and CSS for structure and styling.
    *   **Tailwind CSS** for styling.
    *   **Alpine.js** for dynamic UI elements like the accordion and potentially other interactive features.
    *   **HTMX** for AJAX-like interactions without significant JavaScript.
    *   Jinja2 templating (part of Flask) for rendering dynamic content.
8.  **Proxy Server:** A Flask blueprint will implement a proxy server to handle authentication and requests to the YouTube Data API v3 and Gemini 2.0 API, securing API keys.
9.  **Modularity:** The Flask application will be structured using blueprints to separate concerns such as URL management, API interactions, transcript processing, AI summarization, database operations, UI rendering, and the proxy server. Dependencies between modules exist as described in the functionality (e.g., UI module depends on data from the database and summaries from the AI module).
10. **CSS:** Dark mode CSS styling will be implemented using Tailwind CSS classes.

### **5. UI/UX Design**

1.  **Playlist/Channel Input Area:** A clear section at the top for pasting YouTube URLs with an "ADD" button.
2.  **Collapsible Channel and Playlist Lists:** Sections above the main video list to display managed channels and playlists with sync buttons and relevant information.
3.  **Main Video List View:** A responsive grid or list displaying videos with thumbnails, titles, and key metadata.
4.  **Action Buttons:** Each video entry in the main list will include: "get summary", "copy URL to clipboard", and "delete" buttons.
5.  **Subject Area Dropdown:** A clearly visible dropdown menu for assigning or changing the subject area for each video, channel, or playlist.
6.  **Summary Display:** The AI-generated summary will be displayed prominently for each video, potentially with an option to expand for a longer version if needed.
7.  **Transcript Accordion:** An expandable section below each video's metadata to view the full transcription. Alpine.js will handle the toggle functionality.
8.  **Tags Display:** An editable field to show and modify AI-generated tags for each video.
9.  **"New Subject" Modal:** A simple modal window that appears when "new subject" is selected, allowing the user to enter and save a new subject area.
10. **Visual Feedback:** The "copy URL to clipboard" button should provide clear visual feedback upon successful copying.
11. **Responsive Design:** The UI should be responsive and function well on both desktop and mobile devices.
12. **Dark Mode:** The default theme will be a dark mode style using Tailwind CSS.

### **6. API Integration**

1.  **YouTube Data API v3:**
    *   API calls will be made via the Flask proxy server to manage authentication and quotas.
    *   Endpoints used: `playlists.list`, `channels.list`, `videos.list` for metadata retrieval; `captions.list` and `captions.download` as a fallback for transcripts.
    *   Compliance with YouTube's API terms, including RMF (no removal of YouTube branding) and displaying the Terms of Service link, must be ensured.
2.  **Gemini 2.0 API:**
    *   API calls will be made via the Flask proxy server for summarization.
    *   The specific API endpoint for text generation will be used.
    *   Consideration for API rate limits and token limits will be necessary.

### **7. Transcript Extraction Strategy**

1.  Implement a `TranscriptService` module with multiple strategies for transcript extraction.
2.  Prioritise the `youtube-transcript-api` as the primary method.
3.  Implement the YouTube Data API v3's captions endpoint as the first fallback.
4.  Explore and potentially implement client-side extraction as a secondary fallback for users who grant permission.
5.  Develop a robust caching layer to store successfully retrieved transcripts in the Postgres database to minimise repeat API calls.
6.  Add comprehensive error handling and retry logic for each extraction method.
7.  Implement rate limiting and integrate with a proxy rotation service (e.g., Webshare) for the `youtube-transcript-api`.
8.  Add monitoring to track the success rates of different extraction methods (implementation details TBD).

### **8. Database Design (Postgres Schema)**

(This is a preliminary schema based on the functional specification and may evolve during development)

| Table Name | Column Name           | Data Type      | Primary Key | Foreign Key | Notes                                                                                                      |
| ---------- | --------------------- | -------------- | ----------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| **videos** | video_id              | VARCHAR (255)  | Yes         |             | YouTube video ID                                                                                           |
|            | title                 | TEXT           |             |             |                                                                                                           |
|            | channel_name          | VARCHAR (255)  |             |             |                                                                                                           |
|            | channel_url           | TEXT           |             |             |                                                                                                           |
|            | description           | TEXT           |             |             |                                                                                                           |
|            | publication_date      | TIMESTAMP      |             |             |                                                                                                           |
|            | length_seconds        | INTEGER        |             |             |                                                                                                           |
|            | transcript            | TEXT           |             |             | Cached transcript content                                                                                  |
|            | summary               | TEXT           |             |             | AI-generated summary                                                                                       |
|            | tags                  | TEXT           |             |             | Comma-separated list of tags                                                                                |
|            | subject_area          | VARCHAR (255)  | No          | subjects.name |                                                                                                           |
|            | date_added            | TIMESTAMP      |             |             | Timestamp when the video was added to Yttango                                                              |
| **channels** | channel_url           | TEXT           | Yes         |             | YouTube channel URL                                                                                        |
|            | channel_name          | VARCHAR (255)  |             |             |                                                                                                           |
|            | description           | TEXT           |             |             | Short description of the channel                                                                           |
|            | last_synced           | TIMESTAMP      |             |             | Date and time of the last successful sync                                                                  |
|            | subject_area          | VARCHAR (255)  | No          | subjects.name |                                                                                                           |
| **playlists**| playlist_url          | TEXT           | Yes         |             | YouTube playlist URL                                                                                       |
|            | playlist_name         | VARCHAR (255)  |             |             |                                                                                                           |
|            | creator               | VARCHAR (255)  |             |             | Channel owner name                                                                                         |
|            | description           | TEXT           |             |             | Editable playlist description                                                                              |
|            | last_synced           | TIMESTAMP      |             |             | Date and time of the last successful sync                                                                  |
|            | subject_area          | VARCHAR (255)  | No          | subjects.name |                                                                                                           |
| **subjects** | name                  | VARCHAR (255)  | Yes         |             | User-defined subject area names                                                                           |
|            | date_created          | TIMESTAMP      |             |             | Timestamp when the subject area was created                                                                |
| **video_playlist_association** | video_id              | VARCHAR (255)  | Yes         | videos.video_id | Many-to-many relationship between videos and playlists (if we re-introduce playlist creation) |
|            | playlist_url          | TEXT           | Yes         | playlists.playlist_url |                                                                                                           |

### **9. Error Handling and Logging**

1.  Implement `try-except` blocks to catch potential exceptions during API calls, transcript extraction, database interactions, and other critical operations.
2.  Display user-friendly error messages in the UI when operations fail.
3.  Utilise Python's `logging` module to log errors, warnings, and informational messages to a log file or console. Include timestamps and relevant details about the error or event.
4.  Log API request details (e.g., endpoint, status code), transcript extraction method used and its outcome, and database query execution.
5.  For API rate limit errors, implement retry mechanisms with exponential backoff where appropriate.

### **10. Testing Considerations**

1.  **Unit Tests:** Focus on testing individual modules and functions in isolation:
    *   Testing the different strategies within the `TranscriptService` with various video IDs and mock API responses.
    *   Testing the summarization logic by providing sample transcripts and checking the output format and basic content relevance (without needing perfect accuracy).
    *   Testing database read and write operations for each table.
    *   Testing the URL type detection logic.
2.  **Integration Tests:** Ensure that different modules interact correctly:
    *   Testing the end-to-end flow of adding a YouTube URL (video, playlist, or channel), fetching metadata, extracting transcripts, and generating summaries.
    *   Testing the interaction between the Flask application and the YouTube Data API v3 and Gemini 2.0 API via the proxy server (mocking API responses initially).
    *   Testing the UI components that rely on backend data and functionality (e.g., displaying summaries, transcripts, copying URLs).
3.  **User Testing:** In later phases, gather feedback from potential users on the UI/UX, export functionality, and overall usability.
4.  The coding LLMs will be expected to handle generating tests as part of their standard workflow. Provide clear instructions on testing requirements in prompts (e.g., "Write pytest tests for this function").

### **11. Deployment Considerations**

1.  Initially, the application will be developed and tested locally.
2.  For deployment, a **VPS with a Docker container** is a likely target platform. This will allow for easier management and scalability.
3.  Consideration for environment variables for API keys and database credentials will be necessary for deployment.

### **12. Instructions for LLM Coding Assistants**

When using this specification to instruct LLM coding assistants, consider the following best practices:

*   **Be Explicit and Detailed:** Provide clear and precise instructions. Break down complex tasks into smaller, manageable steps.
*   **Specify Function Signatures:** When asking for functions, provide clear function signatures, including parameters and return types.
*   **Mention Technologies and Libraries:** Explicitly state the Python version, Flask, Postgres, Tailwind CSS, Alpine.js, HTMX, `youtube-transcript-api`, and the need to interact with the YouTube Data API v3 and Gemini 2.0 API via a Flask proxy.
*   **Reference Specific Sections:** When prompting about a specific feature or requirement, refer to the relevant section in this product specification.
*   **Request Test Cases:** For every piece of code generated, ask the LLM to write corresponding unit and integration tests using `pytest`.
*   **Request Documentation:** Ask for clear docstrings and comments for all functions and modules.
*   **Emphasise Error Handling:** Instruct the LLM to include robust error handling for API calls, database operations, and transcript extraction.
*   **Iterate and Refine:** Expect that the first attempt might not be perfect. Be prepared to provide feedback and ask the LLM to refactor and improve the code.
*   **Focus on Incremental Progress:** Break down the development into smaller features and implement them one at a time.
*   **Use Context Effectively:** Start new chats for new major features or tasks to manage context. You can also seed the context with relevant code or parts of this specification.
*   **Ask for Options:** If unsure about the best approach, ask the LLM for different implementation options and their pros and cons.
*   **Treat it Like a Junior Developer:** Provide guidance and review its work carefully.
*   **Test Thoroughly:** You are ultimately responsible for ensuring the code works correctly. Always test the code generated by the LLM.
*   **Leverage Existing Code:** If there's existing boilerplate or utility functions, provide them to the LLM to maintain consistency.
*   **Use File-Based Keyframing (as suggested by Manuel Kießling):** Create empty stub files with correct naming conventions and namespace structure to guide the LLM's code organisation.
*   **Consider Cursor Rules (as suggested by Geoffrey Huntley):** Explore the possibility of using Cursor rules to enforce coding standards, prevent the use of unwanted libraries, and automate tasks like adding license headers or committing changes.

By providing this level of detail and following effective prompting strategies, we should be well-equipped to leverage AI coding assistants to build Yttango efficiently and accurately. Remember that this specification is a living document and may be updated as the project progresses.


Claude provides a critical analysis of the Yttango product specification, highlighting areas for improvement to make it more effective for prompting LLM coding assistants:

## Critical Analysis of the Yttango Product Specification

### Strengths
- Comprehensive structure covering product overview, features, technical requirements, and implementation details
- Detailed database schema with table structures and relationships
- Clear explanation of transcript extraction strategy with fallback mechanisms
- Good guidance for working with LLM coding assistants

### Areas for Improvement

#### 1. Architecture Diagrams and Visual Aids
- **Issue**: The specification lacks visual representations of the system architecture
- **Recommendation**: Add system architecture diagrams showing component relationships, data flow diagrams, and UI wireframes/mockups to help the LLM understand the overall structure

#### 2. API Request/Response Examples
- **Issue**: While API endpoints are mentioned, there are no example requests or responses
- **Recommendation**: Include sample JSON payloads for YouTube API and Gemini API requests/responses to guide the LLM in implementing the correct data parsing

#### 3. Environment Setup and Dependencies
- **Issue**: Missing detailed setup instructions for development environment
- **Recommendation**: Add a requirements.txt file template or detailed dependency list with version numbers, database setup instructions, and environment variable configurations

#### 4. API Key Management
- **Issue**: Proxy server is mentioned but implementation details for API key security are vague
- **Recommendation**: Provide specific patterns for securely handling API keys, including environment variable usage and the proxy server implementation structure

#### 5. Pagination and Performance Considerations
- **Issue**: No discussion of pagination or handling large datasets
- **Recommendation**: Add guidelines for implementing pagination in the video list view and strategies for optimizing database queries with large numbers of videos

#### 6. User Input Validation
- **Issue**: Limited information on validating user inputs (URLs, subject names)
- **Recommendation**: Include validation requirements and error handling strategies for each user input field

#### 7. Cache Invalidation Strategy
- **Issue**: While caching is mentioned, there's no strategy for cache invalidation
- **Recommendation**: Define when and how cached data (transcripts, summaries) should be refreshed or invalidated

#### 8. Rate Limiting Implementation
- **Issue**: Rate limiting is mentioned but implementation details are missing
- **Recommendation**: Provide specific guidance on implementing rate limiting for YouTube API calls and transcript extraction

#### 9. Error States in UI
- **Issue**: Limited guidance on how errors should be presented in the UI
- **Recommendation**: Define error states for different components and how they should be displayed to users

#### 10. Project Structure
- **Issue**: Blueprint structure is mentioned but the exact file organization is unclear
- **Recommendation**: Include a directory structure template showing the organization of files and modules

#### 11. Authentication and Authorization
- **Issue**: No mention of user authentication if needed for future features
- **Recommendation**: Clarify if authentication is needed or plan for future implementation

#### 12. Prompt Templates for Gemini API
- **Issue**: Exact prompts for the Gemini API summarization are not provided
- **Recommendation**: Include sample prompt templates that the LLM should implement for generating summaries and tags

#### 13. Testing Data
- **Issue**: No sample test data provided for development
- **Recommendation**: Include sample YouTube URLs (videos, playlists, channels) that can be used during development and testing

#### 14. Versioning and Migration Strategy
- **Issue**: No mention of database migrations or application versioning
- **Recommendation**: Add guidelines for implementing database migrations and version control

#### 15. Deployment Configuration
- **Issue**: Deployment is mentioned but configuration details are minimal
- **Recommendation**: Provide Dockerfile templates and deployment configuration examples

## Summary

While the product specification is already quite detailed, enhancing it with the suggested improvements would make it significantly more effective for guiding LLM coding assistants. The additions would provide more concrete examples, implementation patterns, and visual aids that would help the LLM generate more accurate and complete code for the Yttango application.

