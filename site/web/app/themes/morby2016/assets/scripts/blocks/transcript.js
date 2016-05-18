/*
 * # transcript.js
 * Allows the user to toggle video transcripts open/closed.
 */

const __config = {
  classes: {
    toggle: 'js--toggle-transcript',
    collapsed: 'js--collapsed',
  },
  height: {
    open: null,
    collapsed: '150px',
  }
};

export default function enableTranscriptToggle(elementClass, startCollapsed = true) {
  const transcript = document.getElementsByClassName(elementClass)[0];

  if (!transcript) {
    return;
  }

  const transcriptHeight = transcript.offsetHeight;
  __config.height.open = transcriptHeight + 'px';
  startCollapsed && toggleCollapse(transcript);
  addToggleLink(transcript);
  transcript.addEventListener('click', handleTranscriptToggle);
}

const handleTranscriptToggle = event => {
  const target = event && event.target;
  if (target && target.classList.contains(__config.classes.toggle)) {
    const transcript = event.currentTarget;
    toggleCollapse(transcript);
  }
};

function addToggleLink(transcript) {
  const toggleElement = document.createElement('a');
  toggleElement.classList.add(__config.classes.toggle);
  toggleElement.textContent = 'Transcript';
  transcript.appendChild(toggleElement);
}

function toggleCollapse(transcript) {
  const isCollapsed = transcript.classList.contains(__config.classes.collapsed);
  const classFunc = isCollapsed ? 'remove' : 'add';
  transcript.style.height = isCollapsed ? __config.height.open : __config.height.collapsed;

  transcript.classList[classFunc](__config.classes.collapsed);
}
