# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# MAIN FEATURE - Generate report for agent by custom agent ID.

## Ticket 1

- **Title :** Including Custom Agent ID

- **Description:** Facities want to save a custom agent ID for searching and reporting purpose. we can refer to this table as a lookup table.

- **Acceptance Criteria:**  The One to many relatioship should allow us to query the data and get the agentID if we pass a custom agent ID.

- **Implementation Details:**
1. Add a table `FacilityAgents` with one to many relationship between facility and Agents. The Schema of the table should include columns like `customId`,`facilityId`, `agentId`.
2. Write a script to add entries for the existing records.
3. Make an API to add new entries

- **Time Estimate: 6Hrs**(1 point)
1. Implementation: 4 Hrs
2. Testing : 2 Hrs

- **Dependencies: None**



## Ticket 2

- **Title :** Add a new method `getShiftByAgent(agentId)`.

- **Description:** `getShiftByAgent(agentId)` will return  all the shift information for the specific agent for the quarter.

- **Acceptance Criteria:** Given a agentId, we should have all his shift information including some metadata for the recent quarter.

- **Implementation Details:**
1. Code up a new method which accepts `agentId` as a argument and returns all the shift information and metadata for the `agentId`.
2. We generally don't need to expose an API for the same as this won't be used directly by the user on the frontend. The user will always enter the
custom agentId on the frontend.

- **Time Estimate: 5Hrs** * (1 point)
1. Implementation: 3 Hrs
2. Testing : 2 Hrs

- **Dependencies: None**



## Ticket 3

- **Title :** Add a new method `generateReportForAgentWithCustomId(customAgentId)`.

- **Description:** `generateReportForAgentWithCustomId(customAgentId)` will generate report for a particular agent using it's custom ID. The Report will include all the shift information and metadata for the quarter.

- **Acceptance Criteria:** Facility Should be able to pass a custom ID as an argument for any agent and get a shift report for the quarter.

- **Implementation Details:**
1. For the given `customAgentId`, find the actual `agentId` using the lookup table `FacilityAgents` which is implmented on `Ticket 1`.
2. Use the method `getShiftByAgent(agentId)`  and pass the `agentId` to the same to get all the shift information and metadata.
3. Call the `generateReport` function to give report in pdf format for the agent. The Report will include all the shift information and metadata for the quarter.

- **Time Estimate: 7Hrs**
1. Implementation: 4 Hrs
2. Testing : 3 Hrs

- **Dependencies:** Ticket 1 and Ticket 2

