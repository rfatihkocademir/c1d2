import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ScenarioBuilder from '../components/ScenarioBuilder'

function ScenarioBuilderPage() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="container" style={{maxWidth:"1900px"}}>
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1 className="mb-12">Senaryo Oluşturucu</h1>
          <p className="lead text-muted">
            Sürükleyip bırakarak otomasyon senaryolarınızı kolayca oluşturun.
          </p>
        </div>
      </div>
      <ScenarioBuilder />
    </div>
  </DndProvider>
  )
}

export default ScenarioBuilderPage