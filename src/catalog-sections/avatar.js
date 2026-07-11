export default function renderAvatarSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>The Avatar contains circle and square.</p>
      <div class="demo">
        <g-avatar src="/images/avatar.png"></g-avatar>
        <g-avatar src="/images/avatar.png"></g-avatar>
        <g-avatar src="/images/avatar.png"></g-avatar>
        <g-avatar src="/images/avatar.png"></g-avatar>
      </div>
    </div>
    <div class="playground">
      <h3>Text</h3>
      <p>Display text in the avatar box.</p>
      <div class="demo">
        <g-avatar text="W"></g-avatar>
        <g-avatar text="A"></g-avatar>
        <g-avatar text="W"></g-avatar>
        <g-avatar text="Joe"></g-avatar>
      </div>
    </div>
    <div class="playground">
      <h3>Group</h3>
      <p>Multiple avatars can overlap and stack together.</p>
      <div class="demo">
        <g-avatar-group>
          <g-avatar src="/images/avatar.png"></g-avatar>
          <g-avatar src="/images/avatar.png"></g-avatar>
          <g-avatar src="/images/avatar.png"></g-avatar>
          <g-avatar src="/images/avatar.png"></g-avatar>
        </g-avatar-group>
      </div>
    </div>
  `;
}
