export default function Dashboard() {
  return (
    <section>
      <div className="main-content-header">
        <h1>Narudžbe</h1>
      </div>
      <table>
        <tr>
          <th>Ime i prezime</th>
          <th>e-mail</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
      </table>
    </section>
  );
}
