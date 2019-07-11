import React from "react";
import Navbar from "./components/main/Navbar";

/**
 * Dashboard mit Kacheln
 * Startseite:
 * Kachel 1: Aktuelle Flüge anzeigen
 * Kachel 2: Todos anzeigen
 * Kachel 3: Kanban-Board
 * Kachel 4: Newsfeed
 * Kachel 5: Chat
 * Kachel 6: Termine
 * Kachel 7: Chart mit aktuellen Usern etc?
 * Kachel 8: Kalender mit Terminen, Feiertagen etc.
 * 
 * Unterseiten:
 * Todos anlegen, bearbeiten, löschen, erledigt
 * Kanban-Board Tasks anlegen (ähnlich wie Jira), T%asks auf 'To Do', 'In Progress', 'Done'
 * Newsfeed anzeigen, bearbeiten (neue URL), vielleicht mehrere Newsfeeds zusammen?!
 * Chat (User aussuchen etc.)
 * Termine anlegen, löschen, bearbeiten aus Outlook importieren
 */
const App = () => {
  return (
    <>
      <Navbar />
      {/* <Container>
        <Row>
          <Col>
            <Cards header="Tasks" content="Coming soon..." />
          </Col>
          <Col>
            <Cards header="News" content="Coming soon..." />
          </Col>
          <Col>
            <Cards header="Kanban" content="Coming soon..." />
          </Col>
        </Row>
        <Row>
          <Col>
            <Cards header="Current flights" content="Coming soon..." />
          </Col>
          <Col>
            <Cards header="Chat" content="Coming soon..." />
          </Col>
          <Col>
            <Cards header="Appointments" content="Coming soon..." />
          </Col>
        </Row>
        <Row>
          <Col>
            <Cards header="Chat" content="Coming soon..." />
          </Col>
          <Col>
            <Cards header="Calendar" content="Coming soon..." />
          </Col>
          <Col>
            <Cards header="Charts" content="Coming soon..." />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default App;
