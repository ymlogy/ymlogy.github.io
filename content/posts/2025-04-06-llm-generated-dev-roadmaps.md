---
title: "Development Roadmaps by 5 LLMs"
date: 2025-04-06
draft: false
description: "Includes suggested prompts"
tags: ["LLM, prompting, Yttango, development"]
categories: ["development", "python", "LLMs"]
---

I asked Claude, Gemini, ChatGPT, Copilot and Perplexity the following prompt:

I am building an app that assesses and manages youtube videos and interfaces with youtube api and google gemini 2.0 api to produce transcript summaries. The first stage of the app building process has already been completed:

A Flask app. User inputs a youtube video URL and the app uses the youtube-transcript-api to extract the transcript, which is displayed in text field together with a 'copy' button that adds to transcript text the the clipboard. 

Refer to the product spec attached and lay out the development stages in a natural and rational order. Each stage should add key functional aspects and build on the foundations of existing codebase. Each stage should be enough to provide a prompt to the LLM coding assistant - a sensible amount of work. For each stage include a suggested prompt for the LLM coding assistant, that provides sufficient detail and specificity in order to maximise the chances of successful code generation.


# Claude 3.7 Sonnet

Based on the Yttango product specification, I'll organize a logical development roadmap that builds on your existing Flask app foundation. Each stage will include a detailed prompt for an LLM coding assistant to help maximize successful code generation.

# Yttango Development Roadmap

## Current Foundation
- Flask app with video URL input
- Transcript extraction via youtube-transcript-api
- Basic transcript display with copy-to-clipboard functionality

## Stage 1: Database Integration & Basic Video Metadata

**Prompt for LLM:**
```
I'm developing a YouTube video management application called Yttango. I've already built a basic Flask app that can extract transcripts from YouTube videos using youtube-transcript-api.

For this stage, I need to:
1. Set up a Postgres database connection in my Flask app
2. Create the initial database schema for storing video data
3. Implement YouTube Data API v3 integration to fetch video metadata
4. Store video data in the database
5. Enhance the UI to display video metadata alongside transcripts

Here's my current app structure:
- app.py (Flask main file)
- templates/index.html (Basic form for URL input and transcript display)
- static/css/main.css (Basic styling)
- requirements.txt

Please help me implement:

1. A database.py module with SQLAlchemy models for the videos table as specified in the schema:
   - video_id (VARCHAR, PK)
   - title (TEXT)
   - channel_name (VARCHAR)
   - channel_url (TEXT)
   - description (TEXT)
   - publication_date (TIMESTAMP)
   - length_seconds (INTEGER)
   - transcript (TEXT)
   - date_added (TIMESTAMP)

2. A youtube_service.py module that:
   - Takes a YouTube API key
   - Has a function to validate and normalize YouTube URLs
   - Has a function to extract the video ID from different URL formats
   - Has a function to fetch video metadata using the YouTube Data API v3

3. Updates to app.py to:
   - Connect to the database
   - Handle video URL submission
   - Fetch and store video metadata
   - Display video metadata alongside the transcript

4. Updated HTML templates using Tailwind CSS for a dark mode UI that shows:
   - Video thumbnail
   - Title
   - Channel name with link
   - Description
   - Publication date
   - Video length
   - The existing transcript and copy button

Include proper error handling, logging, and documentation. Use Python 3.13.2 conventions and type hints where appropriate.
```

## Stage 2: Subject Areas & Enhanced Video Display

**Prompt for LLM:**
```
I'm continuing development on Yttango, my YouTube video management app. I now have a Flask app with:
- Transcript extraction functionality
- Database integration for storing video metadata
- YouTube Data API integration for fetching video details

For this stage, I need to implement:
1. The subject area functionality with database support
2. An enhanced video grid display
3. Video deletion functionality
4. Improved error handling

Please help me implement:

1. Update the database schema to:
   - Add a "subjects" table with:
     - name (VARCHAR, PK)
     - date_created (TIMESTAMP)
   - Add a "subject_area" column (VARCHAR, FK to subjects.name) to the videos table

2. Create subject_service.py to:
   - Retrieve all subject areas
   - Add new subject areas
   - Assign subject areas to videos

3. Update the UI to:
   - Display videos in a grid format with thumbnails
   - Include a dropdown to select/assign subject areas for each video
   - Add a modal dialog for creating new subject areas
   - Add a delete button for removing videos
   - Style everything with Tailwind CSS in dark mode

4. Implement Alpine.js components for:
   - The subject area dropdown
   - The "new subject" modal
   - Interactive UI elements

5. Update app.py to handle:
   - New subject creation
   - Subject assignment to videos
   - Video deletion

Ensure all functionality has proper error handling and database operations are transactional where appropriate. Include docstrings and comments explaining your implementation.
```

## Stage 3: AI Summarization & Proxy Server

**Prompt for LLM:**
```
I'm continuing development on Yttango, my YouTube video management app. So far I have:
- Transcript extraction from YouTube videos
- Database storage for video metadata and transcripts
- Subject area management
- Grid display of videos with basic management features

For this stage, I need to implement:
1. A Flask proxy server blueprint for securely managing API keys
2. Integration with Google's Gemini 2.0 API for generating summaries
3. Tag generation using the AI
4. UI updates to show summaries and tags

Please implement:

1. A proxy_server.py blueprint that:
   - Securely handles YouTube Data API and Gemini API keys
   - Provides proxy endpoints for making API calls
   - Includes proper request validation and error handling

2. A gemini_service.py module that:
   - Connects to the Gemini 2.0 API via the proxy server
   - Contains a function to generate video summaries from transcripts
   - Contains a function to generate relevant tags from transcripts
   - Handles token limits and rate limiting

3. Update the database schema to add:
   - summary (TEXT) field to videos table
   - tags (TEXT) field to videos table

4. Update the UI to:
   - Add a "get summary" button for each video
   - Display AI-generated summaries once available
   - Show editable tags for each video
   - Provide visual feedback during API operations

5. Update app.py to:
   - Connect the proxy server blueprint
   - Handle summary generation requests
   - Store and retrieve summaries and tags

Include proper error handling for API failures, token limits, and other potential issues. Provide comprehensive logging for debugging purposes. Use async processing where appropriate to avoid UI blocking during API calls.
```

## Stage 4: Playlist & Channel Management

**Prompt for LLM:**
```
I'm continuing development on Yttango, my YouTube video management app. So far I have:
- Video metadata retrieval and transcript extraction
- Database storage for videos and subject areas
- AI summarization with Gemini 2.0
- Basic video management UI

For this stage, I need to implement:
1. YouTube playlist and channel URL detection and processing
2. Database tables for channels and playlists
3. UI sections for displaying and managing channels and playlists
4. Functionality to sync latest videos from channels and playlists

Please implement:

1. Update the URL handling to:
   - Detect whether a URL is for a video, playlist, or channel
   - Extract appropriate IDs from each URL type

2. Create database models for:
   - channels table (as per schema with channel_url PK, channel_name, description, last_synced, subject_area)
   - playlists table (as per schema with playlist_url PK, playlist_name, creator, description, last_synced, subject_area)

3. Create service modules:
   - channel_service.py for fetching channel data and latest videos
   - playlist_service.py for fetching playlist data and videos

4. Update the UI to include:
   - Collapsible sections for channels and playlists at the top of the page
   - Display of channel/playlist metadata (thumbnail, name, description)
   - "Sync" buttons for each channel/playlist
   - Subject area dropdown for channels/playlists
   - Indicators for unprocessed videos

5. Update app.py to handle:
   - Adding new channels/playlists
   - Syncing channels/playlists to fetch latest videos
   - Managing unprocessed video counts

Ensure all API calls implement proper error handling, rate limiting, and caching to avoid quota issues. Use background tasks where appropriate for syncing operations that might take time.
```

## Stage 5: Transcript Extraction Strategy & Accordion View

**Prompt for LLM:**
```
I'm continuing development on Yttango, my YouTube video management app. So far I have:
- Complete video, channel, and playlist management
- Database storage for all entities
- AI summarization with Gemini 2.0
- Basic UI for all features

For this stage, I need to implement:
1. The full transcript extraction strategy with fallbacks
2. An accordion component to display full transcripts
3. Enhanced error handling for transcript extraction
4. Caching improvements

Please implement:

1. A TranscriptService module with multiple extraction strategies:
   - Primary: youtube-transcript-api (already implemented)
   - Fallback #1: YouTube Data API v3's captions endpoint
   - Fallback #2: Framework for client-side extraction
   - Include rate limiting and proxy rotation capability
   - Add robust error handling and retry logic

2. Update the UI to:
   - Add an accordion component using Alpine.js for transcript display
   - Show the transcript extraction method used
   - Provide clear feedback on extraction success/failure

3. Implement a caching layer that:
   - Stores successfully retrieved transcripts in the database
   - Checks for cached transcripts before attempting extraction
   - Has configurable expiration for cached transcripts

4. Add monitoring and logging to:
   - Track success rates of different extraction methods
   - Log detailed information about extraction attempts
   - Provide debugging information for failed extractions

Please ensure the implementation is modular and follows the strategy pattern for different extraction methods. Add comprehensive unit tests for each extraction strategy.
```

## Stage 6: Feed Synchronization & Export Functionality

**Prompt for LLM:**
```
I'm continuing development on Yttango, my YouTube video management app. So far I have:
- Complete video, channel, and playlist management
- Multi-strategy transcript extraction with fallbacks
- AI summarization and tagging
- Comprehensive UI for all features

For this stage, I need to implement:
1. The "synchronize feeds" button functionality for XML RSS feeds
2. Copy URL functionality with visual feedback
3. Filter and sort capabilities for the video grid
4. Final UI enhancements

Please implement:

1. A feed_service.py module that:
   - Parses XML RSS feeds from YouTube channels and playlists
   - Identifies new videos not already in the database
   - Handles synchronization of multiple feeds
   - Includes proper error handling and rate limiting

2. Update the UI to add:
   - A prominent "synchronize feeds" button at the top of the page
   - Visual feedback during and after synchronization
   - "Copy URL to clipboard" button for each video with visual feedback
   - Filter controls for the video grid (by subject area, date range)
   - Sort controls for the video grid (by date, title, etc.)

3. Enhance the video grid to:
   - Support pagination for large collections
   - Improve responsiveness on different screen sizes
   - Polish the dark mode styling with Tailwind CSS

4. Add final touches to error handling:
   - User-friendly error messages
   - Logging of synchronization events
   - Recovery mechanisms for failed operations

Include comprehensive documentation for the feed synchronization process and ensure all UI interactions have appropriate visual feedback for users.
```

## Stage 7: Performance Optimization & Deployment Preparation

**Prompt for LLM:**
```
I'm finalizing development on Yttango, my YouTube video management app. All core features are implemented and working. For this final stage, I need to:
1. Optimize database queries and API calls
2. Prepare for deployment in a Docker container
3. Add final error handling and logging improvements
4. Implement database backup/restore functionality

Please help me implement:

1. Database and performance optimizations:
   - Add appropriate indexes to the database tables
   - Implement connection pooling
   - Create query optimizations for common operations
   - Add pagination for large result sets

2. Deployment preparation:
   - Create a Dockerfile for the application
   - Set up environment variable management for secrets
   - Configure logging for production
   - Add health check endpoints

3. Error handling improvements:
   - Implement global error handling
   - Add graceful degradation for API failures
   - Create user-friendly error pages
   - Add application recovery mechanisms

4. Maintenance utilities:
   - Add database backup functionality
   - Create a simple admin interface for database management
   - Add user documentation accessible from the app
   - Implement application metrics/monitoring

Please ensure all code is production-ready with comprehensive comments, docstrings, and follows best practices for security and performance. Include a requirements.txt file with pinned dependency versions and deployment instructions in a README.md file.
```

Each of these stages builds logically on the previous work, delivers a tangible improvement to the application, and provides specific guidance to the LLM assistant. The prompts include concrete requirements, existing context, and expected deliverables to maximize the chances of successful code generation.



# Gemini 2.0

Okay, let's break down the development of the Yttango app into logical stages with LLM prompts. I'll focus on building incrementally, referencing the product spec, and providing detailed prompts.

**Assumptions:**

* You have a basic Flask app set up that can take a YouTube URL, extract the transcript, and display it.
* You're using Python 3.13.2.
* You have Postgres installed and running.

**Stage 1: Database Integration**

* **Objective:** Set up the Postgres database and integrate it with the Flask app to store video metadata and transcripts.
* **Relevant Spec Sections:** 4, 8, 101-167
* **LLM Prompt:**

    ```
    "I have a Flask app that currently extracts and displays YouTube video transcripts. Now I want to integrate a Postgres database to store video data.

    Using Python 3.13.2 and Flask, create the necessary Postgres database schema as defined in the product specification (Section 8: Database Design).

    Then, modify the Flask app to:
    1.  Connect to the Postgres database.
    2.  When a user inputs a YouTube URL and the transcript is extracted:
        * Store the video metadata (video_id, title, channel_name, channel_url, description, publication_date, length_seconds) and the transcript in the 'videos' table.
        * Ensure the 'date_added' field is populated with the current timestamp.
    3.  Implement a function to retrieve all video data from the 'videos' table and display it in the existing UI (below the transcript text area). For now, just display the raw data.
    4.  Include error handling for database connection errors and database query errors. Log these errors using Python's 'logging' module.
    5.  Write pytest unit tests for the database interaction functions (store video data, retrieve video data).

    Provide the following:
    -   SQL code for creating the database schema.
    -   Python code for the Flask app (show the modified parts).
    -   Python code for the pytest unit tests.

    Technologies: Python 3.13.2, Flask, Postgres, psycopg2 (or SQLAlchemy for Postgres).
    "
    ```

**Stage 2: YouTube Data API v3 Integration**

* **Objective:** Enhance the app to fetch video metadata automatically using the YouTube Data API v3 when a URL is entered.
* **Relevant Spec Sections:** 3, 34-37, 62-64, 88-90
* **LLM Prompt:**

    ```
    "Building on the existing Flask app with Postgres integration, I want to now use the YouTube Data API v3 to automatically fetch video metadata.

    Modify the Flask app to:
    1.  When a user inputs a YouTube URL:
        * Determine if the URL is for a single video, a playlist, or a channel (Section 3, requirement 2).
        * If it's a single video URL, use the YouTube Data API v3 to fetch the video metadata (video ID, title, channel name, video length, description, publication date, thumbnails) as specified in Section 3, requirement 5 and store it in the 'videos' table in the database.
        * For now, ignore playlist and channel URLs. We'll handle those later.
    2.  Update the UI to display the fetched metadata (title, channel name, description, publication date, thumbnails) in the video list (replace the raw data display from Stage 1).  Display the thumbnail image.
    3.  Implement error handling for YouTube Data API calls (e.g., invalid API key, video not found, quota exceeded). Log these errors.
    4.  Implement the Flask proxy server for the YouTube Data API v3 calls, as discussed in the spec.  For now, just make sure the proxy works - we will add security later.
    5.  Write pytest unit tests for the YouTube Data API v3 integration, mocking API responses.

    Provide:
    -   Python code for the Flask app (modified parts).
    -   Python code for the Flask proxy server.
    -   Python code for the pytest unit tests.

    Technologies: Python 3.13.2, Flask, Postgres, YouTube Data API v3, Flask proxy,  `google-api-python-client` (or similar library for YouTube API).
    "
    ```

**Stage 3: Gemini 2.0 Integration for Summaries and Tags**

* **Objective:** Integrate the Gemini 2.0 API to generate summaries and tags for videos.
* **Relevant Spec Sections:** 2, 10-11, 42-43, 65-66, 91-93
* **LLM Prompt:**

    ```
    "Continuing from the previous stage, I want to integrate the Gemini 2.0 API to generate summaries and tags for the videos.

    Modify the Flask app to:
    1.  When the user clicks the "get summary" button (add this button to each video entry in the UI),
        * Retrieve the transcript from the database for the corresponding video.
        * Send the transcript to the Gemini 2.0 API via the Flask proxy server.  Use the prompt specified in Section 3, requirement 7  to request a concise summary and a list of tags.
        * Store the generated summary and tags in the 'videos' table in the database.
        * Update the UI to display the summary and tags for the video. Make the tags editable in a text field.
    2.  Implement error handling for Gemini 2.0 API calls. Log any errors.
    3.  Secure the Flask proxy server to handle the Gemini 2.0 API key securely (as discussed in the spec). Use environment variables to store the API key and do not expose it in the code.
    4.  Write pytest unit tests for the Gemini 2.0 API integration (mocking API responses).  Test the prompt and parsing of the response.

    Provide:
    -   Python code for the Flask app (modified parts).
    -   Python code for modifications to the Flask proxy server.
    -   Python code for the pytest unit tests.

    Technologies: Python 3.13.2, Flask, Postgres, Gemini 2.0 API, Flask proxy.
    "
    ```

**Stage 4:  Channel and Playlist Handling**

* **Objective:** Implement the functionality to add and sync channels and playlists.
* **Relevant Spec Sections:** 2, 8-9, 17-20, 34-35, 55
* **LLM Prompt:**

    ```
    "Now, let's implement channel and playlist handling.

    Modify the Flask app to:
    1.  When the user enters a YouTube URL:
        * If it's a channel URL:
            * Add the channel to the 'channels' table in the database (channel_url, channel_name, description).
            * Display the channel in the collapsible channel list (Section 2, feature 7). Include the channel thumbnail, name, last synced date (initially None), and number of unprocessed videos (initially 0).
        * If it's a playlist URL:
            * Add the playlist to the 'playlists' table (playlist_url, playlist_name, creator, description, subject_area). The 'subject_area' will default to 'general' for now.
            * Display the playlist in the collapsible playlist list. Include the playlist thumbnail (or placeholder), name, assigned subject area, last synced date (None), number of unprocessed videos (0), playlist creator, and editable playlist description.
        * Implement the "Sync" button for both channels and playlists:
            * When clicked, fetch the latest 15 videos from the channel or playlist using the YouTube Data API v3.
            * Add the videos to the 'videos' table (if they don't already exist).
            * Update the channel or playlist's 'last_synced' date.
            * Update the number of unprocessed videos in the channel/playlist lists.
    2.  Update the UI to display the channel and playlist information as described.
    3.  Write pytest unit tests for the channel and playlist handling.

    Provide:
    -   Python code for the Flask app (modified parts).
    -   SQL code for any necessary database schema updates.
    -   Python code for the pytest unit tests.

    Technologies: Python 3.13.2, Flask, Postgres, YouTube Data API v3.
    "
    ```

**Stage 5: Subject Area Management**

* **Objective:** Implement the subject area functionality.
* **Relevant Spec Sections:** 2, 15-16, 51-52, 80, 84
* **LLM Prompt:**

    ```
    "Implement the subject area management feature.

    Modify the Flask app to:
    1.  Implement the subject area dropdown menu for videos, playlists, and channels.  Populate it from the 'subjects' table.
    2.  Implement the "new subject" modal:
        * When the user selects "new subject," display a modal (you can use Alpine.js or a simple HTML/CSS modal).
        * Allow the user to enter a new subject area name.
        * When the user saves the new subject, add it to the 'subjects' table in the database and update the dropdown menu.
    3.  Allow users to assign subject areas to videos, playlists, and channels. Update the database accordingly.
    4.  Update the UI to reflect the assigned subject areas.
    5.  Write pytest unit tests for the subject area management functionality.

    Provide:
    -   Python code for the Flask app (modified parts).
    -   SQL code for any necessary database schema updates.
    -   HTML/CSS/Alpine.js code for the modal (if applicable).
    -   Python code for the pytest unit tests.

    Technologies: Python 3.13.2, Flask, Postgres, Alpine.js (or HTML/CSS for modal).
    "
    ```

**Stage 6: UI Enhancements and Export Functionality**

* **Objective:** Implement the remaining UI features and the "copy URL to clipboard" functionality.
* **Relevant Spec Sections:** 2, 13, 44-50, 68-71, 78-79, 81-83, 85-87
* **LLM Prompt:**

    ```
    "Implement the remaining UI enhancements and the export functionality.

    Modify the Flask app and UI to:
    1.  Implement the video grid/list view with sorting and filtering (if possible with HTMX, otherwise use JavaScript).
    2.  Make video thumbnails clickable to open the video in a new tab.
    3.  Implement the accordion component to display the full transcript (use Alpine.js).
    4.  Implement the "copy video URL to clipboard" button with visual feedback.
    5.  Implement the "delete" button to remove videos from the UI and the database.
    6.  Ensure the UI is responsive and uses the dark mode theme with Tailwind CSS.

    Provide:
    -   Python code for the Flask app (modified parts).
    -   HTML/CSS/Tailwind CSS/Alpine.js/HTMX code for the UI.
    -   Python code for pytest unit tests (if applicable for any backend changes).

    Technologies: Python 3.13.2, Flask, Postgres, Tailwind CSS, Alpine.js, HTMX.
    "
    ```

**Stage 7: Error Handling, Logging, and Database Management**

* **Objective:** Implement comprehensive error handling, logging, and the database purge functionality.
* **Relevant Spec Sections:** 2, 22, 24, 53-54, 56-59, 168-173
* **LLM Prompt:**

    ```
    "Implement comprehensive error handling, logging, and database management.

    Modify the Flask app to:
    1.  Implement robust error handling for all API calls, database operations, and transcript extraction. Display user-friendly error messages in the UI.
    2.  Use Python's 'logging' module to log errors, warnings, and informational messages. Include timestamps and relevant details.
    3.  Implement the function to purge the entire database (add a button in the UI for this).
    4.  Implement the functionality to delete selected entries from the database.

    Provide:
    -   Python code for the Flask app (modified parts).
    -   HTML/CSS code for the database purge button.
    -   Python code for pytest unit tests (if applicable).

    Technologies: Python 3.13.2, Flask, Postgres, Python's 'logging' module.
    "
    ```

**Stage 8:  Testing and Deployment**

* **Objective:** Finalize testing and prepare for deployment.
* **Relevant Spec Sections:** 10, 183-185
* **LLM Prompt:**

    ```
    "Finalize testing and prepare for deployment.

    1.  Review and improve all existing unit and integration tests.
    2.  Write any missing tests to ensure comprehensive coverage.
    3.  Provide a Dockerfile for containerizing the application.
    4.  Provide instructions on setting up environment variables for API keys and database credentials.
    5.  Outline the steps for deploying the application to a VPS.

    Provide:
    -   All Python code for pytest tests.
    -   The Dockerfile.
    -   Deployment instructions.

    Technologies: Python 3.13.2, Flask, Postgres, Docker.
    "
    ```

This staged approach, with detailed prompts, should help you effectively guide the LLM coding assistant to build the Yttango application. Remember to iterate, refine, and test each stage thoroughly!



# ChatGPT

Below is a suggested roadmap with development stages that build on your existing Flask app. Each stage adds key functionality in a logical order, along with a sample prompt for an LLM coding assistant that provides enough detail to guide the code generation.

---

### **Stage 1: Video Transcript Extraction (Completed)**
- **What’s done:**  
  A basic Flask app accepts a YouTube video URL, extracts the transcript using the `youtube-transcript-api`, and displays it in a text field with a “copy” button.
- **LLM Prompt Example:**  
  *"The basic transcript extraction feature is complete. Next, I need to extend this functionality with additional video data extraction. Provide me with a code snippet that sets up the Flask endpoint for transcript retrieval and displays the transcript with a working copy-to-clipboard button using vanilla JavaScript or a small JS library."*

---

### **Stage 2: Video Metadata Extraction**
- **New Functionality:**  
  Integrate YouTube Data API v3 to fetch additional metadata (e.g., video title, channel name, description, publication date, duration, and thumbnails) for the input video URL.
- **LLM Prompt Example:**  
  *"Extend the Flask app by adding a new function that, given a YouTube video URL, calls the YouTube Data API v3 to fetch video metadata (title, channel name, description, publication date, duration, and thumbnail URL). Update the Flask route to combine transcript extraction and metadata retrieval, then render these details in the UI using Jinja2 templates."*

---

### **Stage 3: Enhanced UI for Video Display**
- **New Functionality:**  
  Create a responsive grid view for videos using Tailwind CSS. Display video thumbnails, titles, and metadata alongside the transcript. Improve the “copy URL” functionality with visual feedback.
- **LLM Prompt Example:**  
  *"Enhance the front-end of the Flask app by designing a responsive grid view using Tailwind CSS. Each video card should include the thumbnail (clickable to open the video), title, publication date, and a ‘copy URL’ button with visual feedback. Use Jinja2 for dynamic rendering and include necessary CSS classes to support a dark mode theme."*

---

### **Stage 4: Database Integration with Postgres**
- **New Functionality:**  
  Implement a Postgres database to store video data (metadata, transcript, AI-generated summary, tags, subject area, etc.). Set up CRUD operations for videos.
- **LLM Prompt Example:**  
  *"Integrate a Postgres database into our Flask application using SQLAlchemy. Create a model for videos with fields for video ID, title, channel name, description, publication date, transcript, summary, tags, and subject area. Modify the video submission route to save video metadata and transcript to the database, and add endpoints to update and delete video records."*

---

### **Stage 5: Channel/Playlist Sync Functionality**
- **New Functionality:**  
  Enable the application to accept channel and playlist URLs, automatically detect the type of URL, and sync the latest 15 videos using the appropriate YouTube Data API endpoints.
- **LLM Prompt Example:**  
  *"Add functionality to the Flask app to handle both individual video URLs and channel/playlist URLs. Implement URL type detection and, for channels/playlists, use YouTube Data API endpoints such as `channels.list` or `playlists.list` to fetch the latest 15 videos. Ensure new videos are added to the UI grid and stored in the database, avoiding duplicates."*

---

### **Stage 6: AI Summarization via Gemini 2.0 API**
- **New Functionality:**  
  Integrate the Gemini 2.0 API to generate concise summaries and tags for each video transcript. Use a Flask proxy endpoint to securely handle API keys.
- **LLM Prompt Example:**  
  *"Implement an AI summarization module in the Flask app that sends the video transcript to the Gemini 2.0 API through a secure Flask proxy endpoint. The API should return a summary and a list of tags. Update the video detail view to display the AI-generated summary and provide an editable field for the tags. Include error handling and rate limit management for API calls."*

---

### **Stage 7: Advanced UI Features and Interactivity**
- **New Functionality:**  
  Enhance the UI with an expandable accordion for the full transcript, an editable tags field, and dynamic elements using Alpine.js and HTMX.
- **LLM Prompt Example:**  
  *"Improve the front-end interactivity by integrating Alpine.js and HTMX. Add an accordion component to toggle the display of the full transcript. Implement an editable tags field where users can modify the AI-generated tags, and provide interactive elements (like the copy URL button) with real-time feedback. Ensure that the dynamic components work seamlessly with the Jinja2-rendered content."*

---

### **Stage 8: Subject Area and Categorization Management**
- **New Functionality:**  
  Allow users to assign videos to subject areas via a dropdown and to create new subject areas using a modal dialog. Pre-populate subject areas where applicable.
- **LLM Prompt Example:**  
  *"Extend the Flask app to include subject area management. Create a dropdown menu for each video card that lists available subject areas and an option to add a new subject. When the user selects 'new subject,' display a modal window to input and save a new subject area. Update the database schema and backend routes to support these operations."*

---

### **Stage 9: Robust Error Handling, Logging, and Caching**
- **New Functionality:**  
  Add comprehensive error handling for API calls, transcript extraction, and database operations. Implement logging for significant events and a caching layer to store transcripts and summaries.
- **LLM Prompt Example:**  
  *"Implement robust error handling and logging throughout the Flask application. Add try-except blocks for YouTube and Gemini API calls, transcript extraction, and database operations. Use Python's logging module to record events and errors. Additionally, implement a caching mechanism (e.g., using Flask-Caching or Redis) to store retrieved transcripts and summaries to reduce API calls and improve performance."*

---

### **Stage 10: Deployment and Environment Configuration**
- **New Functionality:**  
  Prepare the application for deployment by creating Docker configurations, managing environment variables securely (for API keys and database credentials), and optimizing production settings.
- **LLM Prompt Example:**  
  *"Create a Dockerfile and a Docker Compose configuration to containerize the Flask app and Postgres database. Ensure the configuration uses environment variables for API keys, database credentials, and other sensitive settings. Provide instructions for building and running the containers locally, and set up production-ready settings such as logging and error monitoring."*

---

Each stage is designed to be a manageable unit of work that leverages the foundation built in previous stages. By following these stages and using the detailed prompts, you can guide the LLM coding assistant to generate precise and functional code snippets to progressively build out the Yttango app.



# Copilot

Below is a staged plan that incrementally builds on your current Flask app (which already extracts a transcript for a single video and offers a copy-to-clipboard feature). Each stage adds key functional aspects from the Yttango product specification and includes a detailed prompt you could give to an LLM coding assistant.

---

### **Stage 1: Base Functionality (Completed)**
**What’s Done:**  
- A user inputs a YouTube video URL.  
- The app uses the `youtube-transcript-api` to extract the transcript.  
- The transcript is displayed with a “copy” button that copies its text to the clipboard.

*No prompt is needed for this stage, as it is already implemented.*

---

### **Stage 2: URL Management & Link Type Detection**

**New Functional Aspects:**  
- Extend the URL input function so that it supports not only individual video URLs but also playlist and channel URLs.
- Automatically determine the type of URL (video, playlist, or channel) using appropriate parsing or regular expressions.
- For non-video URLs, plan to initiate calls to the YouTube Data API v3 (to later fetch multiple video metadata).

**Suggested Prompt to the LLM:**

> **Prompt:**  
> *"Enhance our existing Flask app by expanding the URL input functionality. Create a function `detect_url_type(url: str) -> str` that inspects a YouTube URL and returns `'video'`, `'playlist'`, or `'channel'`. Use regular expressions or URL parsing to accurately detect the type.  
>  
> For video URLs, continue to fetch and display transcripts as before. For playlist and channel URLs, add logic (stub functions are acceptable for now) that would later fetch the latest N (e.g., 15) video IDs and metadata using the YouTube Data API v3.  
>  
> Integrate this detection into a new Flask route `/add_url` such that when the user submits a URL, the route returns the detected type in JSON. Include robust error handling and logging for invalid URLs.  
>  
> Please include appropriate unit tests for the URL type detection function."*

---

### **Stage 3: Enhanced Video Metadata Retrieval & Display**

**New Functional Aspects:**  
- Upon adding a video URL, fetch additional metadata from YouTube (e.g., title, channel name, thumbnail, publication date, and video length) via YouTube Data API v3.
- Integrate a basic database model (if not already in place) for storing these metadata details.
- Update the UI to display this metadata alongside the transcript.

**Suggested Prompt to the LLM:**

> **Prompt:**  
> *"Extend the Flask app to retrieve additional video metadata by integrating the YouTube Data API v3.  
>  
> Create a function `get_video_metadata(video_id: str) -> dict` that calls the YouTube Data API to retrieve details such as title, channel name, thumbnail URL, publication date, and duration.  
>  
> Update the existing video processing endpoint (`/add_video`) so that, when a video URL is added, the app stores both the transcript (as before) and the retrieved metadata into a Postgres database (using SQLAlchemy or direct SQL queries, as preferred).  
>  
> Finally, develop a simple UI page that lists videos in a grid or table format, displaying each video’s thumbnail, title, and publication date. Include the transcript area with the copy button alongside these details.  
>  
> Ensure error handling is in place for API failures and add comments/docstrings to all new functions."*

---

### **Stage 4: Integration of Gemini 2.0 API for AI Summarization**

**New Functional Aspects:**  
- Once a transcript is available, add functionality to pass that transcript to the Gemini 2.0 API to obtain a concise summary and a set of suggested tags.
- Create an interactive “Get Summary” button for each video that triggers this process.
- Display the AI-generated summary and provide an editable field for the generated tags.

**Suggested Prompt to the LLM:**

> **Prompt:**  
> *"Implement AI summarization using the Gemini 2.0 API within our Flask app.  
>  
> Create a new route `/summarize/<video_id>` that, when called, retrieves the stored transcript for the given video, and sends it as a payload to the Gemini 2.0 API endpoint (you may stub out the actual API credentials and endpoint for now).  
>  
> Parse the response to extract a concise summary and a list of tags. Store the summary and tags in the database for that video record.  
>  
> Modify the UI for an individual video: add a 'Get Summary' button that, when clicked, calls the new endpoint via AJAX (or HTMX) and then displays the summary and editable tags in the UI.  
>  
> Ensure that the code includes error handling (for API rate limiting, connection issues, etc.) and fallback procedures. Please also write unit tests for the summarization process and include inline comments and docstrings."*

---

### **Stage 5: Comprehensive Video Management UI with Actions**

**New Functional Aspects:**  
- Build a full-featured video management interface that displays a grid of videos complete with thumbnail, title, publication date, and summary.
- Provide interactive buttons for actions such as “copy URL”, “delete video”, and “synchronize” (initially, this can just trigger a stub endpoint).
- Utilize Tailwind CSS for styling (with dark mode support) and Alpine.js for dynamic elements like accordions (for transcript display) and modals (for subject area management).

**Suggested Prompt to the LLM:**

> **Prompt:**  
> *"Using Flask with Jinja2 templating, develop a dedicated page `/videos` that displays all stored videos in a responsive grid view.  
>  
> Each video card should include:  
> - The video thumbnail (clickable to open the video in a new tab)  
> - Title, publication date, and other metadata  
> - An expandable section (using Alpine.js) to show the full transcript  
> - A visible AI-generated summary (if available)  
> - Action buttons: 'Copy Video URL', 'Delete Video', and (temporarily stubbed) 'Synchronize'  
>  
> Style the page using Tailwind CSS with a default dark mode theme.  
>  
> Also, implement the backend deletion endpoint that removes a video from the Postgres database upon confirmation.  
>  
> Add proper error handling and logging for any UI-triggered server actions, and include sample unit tests for the deletion functionality."*

---

### **Stage 6: Channel & Playlist Synchronization and Subject Area Management**

**New Functional Aspects:**  
- Extend the app to support channel and playlist URLs.  
- Create separate sections in the UI to display channels and playlists along with their metadata (such as channel description, sync status, and thumbnail).  
- Implement a “sync” feature that uses the YouTube Data API v3 to fetch the most recent videos from each channel or playlist that has been added, checking for and adding only new videos.
- Allow assignment of videos (and channels/playlists) to subject areas, with an editable drop-down and modal for creating new subjects.

**Suggested Prompt to the LLM:**

> **Prompt:**  
> *"Expand the Flask app to manage channel and playlist URLs following the Yttango specifications.  
>  
> Create new routes and database models (if not already present) for channels and playlists. Each should store key metadata (such as channel/playlist URL, name, description, thumbnail, last sync time, etc.).  
>  
> Develop a UI section for Channels and Playlists at the top of the video management page. Each should have a ‘Sync’ button that, when clicked, calls an endpoint to fetch the latest N (e.g., 15) videos from that source via the YouTube Data API v3 and integrates any new videos into the main video list.  
>  
> Also, implement a subject area management feature – add a drop-down selector for each video, channel, and playlist that allows the user to assign or create new subject areas via a modal popup.  
>  
> Include detailed error handling and logging for the sync process, and ensure that the database is updated accordingly. Write unit tests for the sync functionality and subject area assignments."*

---

### **Stage 7: Final Enhancements, Robust Error Handling, and Deployment Configuration**

**New Functional Aspects:**  
- Refine logging across all modules using Python’s `logging` module (include timestamps, error details, and diagnostic info).
- Implement comprehensive error handling for all external API calls (YouTube, Gemini) and database operations.
- Introduce caching for transcripts and summaries to avoid redundant API calls.
- Prepare the app for production by creating a `Dockerfile`, `docker-compose.yml` (if needed), and a detailed `requirements.txt` file.
- Configure environment variables to securely manage API keys and credentials.

**Suggested Prompt to the LLM:**

> **Prompt:**  
> *"Perform a final round of enhancements for the Flask app by doing the following:  
>  
> 1. Integrate Python’s `logging` module throughout the app to log key events such as API call successes/failures, database operations, and user actions. Make sure to log any exceptions with detailed traceback information.  
>  
> 2. Improve error handling in all routes – wrap API calls (YouTube Data API, Gemini 2.0 API) and database transactions in try-except blocks and return clear error messages on failure.  
>  
> 3. Add a simple caching layer (e.g., using a Python dictionary or a lightweight cache library) to store transcripts and summaries, with logic to invalidate stale data.  
>  
> 4. Create a `Dockerfile` and (optionally) a `docker-compose.yml` that define the environment for deployment, as well as a `requirements.txt` file with pinned versions of all dependencies. Use environment variables for API keys and sensitive information.  
>  
> 5. Expand your unit and integration tests to cover these new error-handling and caching functionalities.  
>  
> Please include comments and docstrings throughout the code and ensure that unit tests validate the caching and error handling behavior."*

---

Each stage builds logically on the previous one and supplies a robust enough prompt to guide an LLM coding assistant toward successful, focused code generation. These detailed prompts can be used as standalone tasks or bundled into a development roadmap as you continue to enrich the application’s functionality.


# Perplexity

Here's a suggested breakdown of the Yttango app development, based on the product specification, divided into manageable stages:

### Stage 1: Database Setup and Basic Video Data Storage

*   **Objective:** Establish the Postgres database and create the `videos` table to store basic video information.
*   **Tasks:**
    1.  Define the database schema for the `videos` table (video\_id, title, channel\_name, channel\_url, description, publication\_date, length\_seconds).
    2.  Implement database connection and ORM (e.g., SQLAlchemy).
    3.  Modify the existing Flask app to:
        *   Store video metadata (retrieved from the YouTube Data API) into the `videos` table when a URL is submitted.
        *   Retrieve the transcript from the database if it exists; otherwise, extract it using the current method and save it to the database.
    4.  Add a basic UI element to display stored video metadata (title, channel name) alongside the transcript.
*   **LLM Prompt Example:** "Modify the existing Flask app to connect to a Postgres database, create the `videos` table with columns $$video\_id, title, channel\_name, channel\_url, description, publication\_date, length\_seconds, transcript], and store the video metadata and transcript when a YouTube URL is submitted. Display the title and channel name in the UI."

### Stage 2: YouTube Data API Integration for Metadata and Link Type Detection

*   **Objective:** Implement YouTube Data API calls for enhanced metadata retrieval and automatic URL type detection.
*   **Tasks:**
    1.  Implement the Flask proxy server for secure API key management.
    2.  Integrate the YouTube Data API v3 to retrieve video metadata (title, channel name, description, publication date, thumbnails, video length) based on the video ID.
    3.  Implement URL type detection: Modify the input field to determine if the entered URL is a video, channel, or playlist.
    4.  For video URLs, retrieve and store all relevant metadata from the YouTube Data API in the `videos` table.
    5.  Display the video thumbnail in the UI (make it clickable to open the video in a new tab).
*   **LLM Prompt Example:** "Implement a Flask proxy server to manage the YouTube Data API key. Modify the app to use the YouTube Data API to retrieve video metadata (title, channel name, description, publication date, thumbnails, video length). Implement URL type detection and store the metadata in the database. Display the video thumbnail in the UI."

### Stage 3: AI Summarization with Gemini 2.0

*   **Objective:** Integrate Gemini 2.0 to generate video summaries and tags.
*   **Tasks:**
    1.  Implement Gemini 2.0 API integration via the Flask proxy server.
    2.  Add a "Get Summary" button to the UI for each video.
    3.  When the button is clicked:
        *   Send the video transcript to the Gemini 2.0 API.
        *   Store the AI-generated summary and tags in the `videos` table.
        *   Display the summary and tags in the UI (tags should be in an editable field).
    4.  Implement error handling for API calls.
*   **LLM Prompt Example:** "Integrate the Gemini 2.0 API to generate video summaries and tags. Add a 'Get Summary' button to the UI. When clicked, send the transcript to Gemini, store the summary and tags in the database, and display them in the UI."

### Stage 4: Channel and Playlist Support

*   **Objective:** Enable the app to handle channel and playlist URLs.
*   **Tasks:**
    1.  When a channel/playlist URL is entered:
        *   Use the YouTube Data API to fetch the latest 15 videos (or fewer if there are no new videos).
        *   Store the video metadata in the `videos` table.
        *   Display the videos in the main video list.
    2.  Add collapsible sections in the UI to list added channels and playlists:
        *   Display channel/playlist thumbnail, name, description, and the date of the most recent video.
    3.  Implement the "Sync" button for channels and playlists:
        *   Fetch the latest videos and add them to the video list and database.
*   **LLM Prompt Example:** "Modify the app to handle channel and playlist URLs. Fetch the latest 15 videos, store the metadata, and display them in the main video list. Add collapsible sections for channels and playlists with a 'Sync' button to fetch new videos."

### Stage 5: Subject Area Management

*   **Objective:** Implement subject area categorization for videos.
*   **Tasks:**
    1.  Create the `subjects` table in the database (name, description).
    2.  Add a dropdown menu to the UI for each video, allowing users to assign a subject area.
    3.  Implement the "New Subject" modal window.
    4.  Store the subject area assignment in the `videos` table.
    5.  Allow subject areas to be pre-populated from channel/playlist data or default to 'general'.
*   **LLM Prompt Example:** "Implement subject area categorization for videos. Create the `subjects` table, add a dropdown menu to the UI, implement the 'New Subject' modal, and store the subject area assignment in the `videos` table."

### Stage 6: UI/UX Enhancements and Export Functionality

*   **Objective:** Enhance the user interface and add export options.
*   **Tasks:**
    1.  Implement the dark mode UI using Tailwind CSS.
    2.  Add a "Copy Video URL to Clipboard" button with visual feedback.
    3.  Implement the transcript accordion using Alpine.js.
    4.  Implement sorting and filtering for the main video list.
*   **LLM Prompt Example:** "Implement a dark mode UI using Tailwind CSS, add a 'Copy Video URL to Clipboard' button, implement the transcript accordion using Alpine.js, and add sorting and filtering to the main video list."

### Stage 7: Error Handling, Logging, and Database Management

*   **Objective:** Implement robust error handling, logging, and database management features.
*   **Tasks:**
    1.  Implement comprehensive error handling for API calls, transcript extraction, and database operations.
    2.  Implement logging for significant events.
    3.  Add a "Delete" button to remove individual videos from the UI and database.
    4.  Implement a function to purge the entire database.
*   **LLM Prompt Example:** "Implement comprehensive error handling and logging. Add a 'Delete' button and a function to purge the entire database."

### Stage 8: Synchronize Feeds Functionality
*   **Objective:** Implement the synchronize feeds functionality
*   **Tasks:**
    1.  Implement the 'synchronize feeds' button, which should be placed such that the user must click it before any api calls are made to the Youtube Data v3 API, and the Gemini 2.0 API
    2.  implement the functionality of the 'synchronize feeds' button such that it pulls in the most recent videos from the youtube video feeds that the user has added to the app. 
    3.  make sure that the feeds are the xml rss feeds from the channels and playlists that the user has previously added and are listed in the channels and playlists sections at the top of the UI grid
    4.  make sure that the feeds list key metadata of the last 15 videos in the feed
    5.  make sure that when the user clicks the 'synchronize feeds' the app only adds videos to the grid ui that have not already been added.
    6.  make sure that videos remain in the grid ui until they are either deleted or added to the postgres rag database
    7.  refer to the code in the source file: 2025-04-03-find-rss-address-from-youtube-playlist, to extract the playlist feed URL from the playlist URL that the user enters
    8.  use the method or code found in the repository at https://github.com/PeskyPotato/yt-rss, to extract the channel feed URL from the channel URL
*   **LLM Prompt Example:** "Implement the synchronize feeds functionality, such that the user must click it before any api calls are made to the Youtube Data v3 API, and the Gemini 2.0 API. The implementation must pull in the most recent videos from the youtube video feeds that the user has added to the app, from the xml rss feeds from the channels and playlists that the user has previously added and are listed in the channels and playlists sections at the top of the UI grid. The feeds must list key metadata of the last 15 videos in the feed. When the user clicks the 'synchronize feeds' the app must only add videos to the grid ui that have not already been added, and videos must remain in the grid ui until they are either deleted or added to the postgres rag database. Refer to the code in the source file: 2025-04-03-find-rss-address-from-youtube-playlist, to extract the playlist feed URL from the playlist URL that the user enters, and use the method or code found in the repository at https://github.com/PeskyPotato/yt-rss, to extract the channel feed URL from the channel URL"

This staged approach allows for incremental development and testing, ensuring that each feature is properly implemented before moving on to the next. Remember to adapt the LLM prompts to your specific codebase and preferred coding style.
