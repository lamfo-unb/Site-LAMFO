# LAMFO Data

This directory contains the data files for LAMFO website information.

## Files

- `members.toml` - Contains all member information in TOML format
- `projects.toml` - Contains all project information in TOML format

## Structure

### Members (members.toml)

The TOML file is organized into the following sections:

### Coordinators

Leaders and coordinators of the laboratory.

### Professors

Collaborating professors from various departments.

### Current Students

Current graduate and undergraduate students.

### Alumni

Former members who have graduated or left the program.

### Research Areas

List of research areas covered by the laboratory.

## Member Information Fields

Each member can have the following fields:

- `name` (required) - Full name
- `role` (required) - Role in the laboratory
- `department` - Academic department (for professors)
- `program` - Academic program (for students)
- `research_area` - Main research area
- `graduation_year` - Year of graduation (for alumni)
- `current_position` - Current job position (for alumni)
- `thesis_title` - Title of thesis/dissertation (for alumni)
- `bio` (required) - Short biography
- `email` (required) - Contact email
- `image` (required) - Path to profile image
- `linkedin` - LinkedIn profile URL
- `lattes` - Lattes curriculum URL

### Projects (projects.toml)

The projects file contains an array of project objects with the following fields:

## Project Information Fields

Each project can have the following fields:

- `name` (required) - Project name
- `description` (required) - Brief description
- `research_area` (required) - Research area category
- `status` (required) - Project status (Ativo, Concluído, Em Planejamento)
- `year_started` (required) - Year the project started
- `year_ended` - Year the project ended (empty for ongoing projects)
- `participants` (required) - Array of participant names
- `technologies` (required) - Array of technologies used
- `github_url` - GitHub repository URL
- `paper_url` - Published paper URL
- `abstract` (required) - Project abstract/summary

## Images

Member profile images should be placed in `/public/members/` directory and referenced in the TOML file with the path `/members/filename.jpg`.

## Adding New Members

1. Add the member information to the appropriate section in `members.toml`
2. Add their profile image to `/public/members/`
3. The website will automatically update to display the new member

## Adding New Projects

1. Add the project information to the `projects.toml` file
2. The website will automatically update to display the new project

## Editing Members/Projects

Simply edit the respective TOML file and the changes will be reflected on the website after the next build.
