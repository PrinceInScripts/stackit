// src/components/Portal.jsx
import React from 'react'
import { createPortal } from 'react-dom'

/**
 * Portal component renders children into a DOM node outside the parent hierarchy.
 * It uses a div with id 'portal-root' if present, otherwise falls back to document.body.
 */
export default function Portal({ children }) {
  const mountNode = document.getElementById('portal-root') || document.body
  return createPortal(children, mountNode)
}
