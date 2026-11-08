import { TargetControl } from "./TargetControl";

export function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <div className="eyebrow">TOEFL ITP · Belajar mandiri</div>
        <h1>Siap TOEFL ITP</h1>
        <div className="chips">
          <span className="chip c-listen">50 Listening</span>
          <span className="chip c-struct">40 Structure</span>
          <span className="chip c-read">50 Reading</span>
          <span className="chip c-mulai">Kamu pasti bisa!</span>
        </div>
        <p className="lead">
          Materi, strategi, dan latihan untuk pemula yang belum pernah ikut TOEFL. Mulai dari tab <b>Mulai</b>, pelajari
          tiap bagian, lalu coba <b>Simulasi</b> untuk melihat perkiraan skormu.
        </p>
        <TargetControl />
      </div>
    </header>
  );
}
