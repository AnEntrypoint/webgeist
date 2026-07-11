export default function renderUserSection() {
  return `
    <div class="playground">
      <h3>Basic</h3>
      <p>Show username.</p>
      <div class="demo">
        <g-user src="/images/avatar.png" name="Witt"></g-user>
      </div>
    </div>
    <div class="playground">
      <h3>Description</h3>
      <p>Show an extra description.</p>
      <div class="demo">
        <g-user src="https://unix.bio/assets/avatar.png" name="Witt" text="JavaScript engineer"></g-user>
      </div>
    </div>
    <div class="playground">
      <h3>No Avatar</h3>
      <p>Displays initials when no image is provided.</p>
      <div class="demo">
        <g-user name="Witt" text="JavaScript engineer"></g-user>
      </div>
    </div>
  `;
}
