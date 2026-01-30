
'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export async function setDocumentNonBlocking(docRef: DocumentReference, data: any, options: SetOptions) /* eslint-disable-line @typescript-eslint/no-explicit-any */ {
  try {
    await setDoc(docRef, data, options)
  } catch (error) {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
      })
    )
    // Re-throw the original error if you want the caller to be able to catch it
    throw error;
  }
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export async function addDocumentNonBlocking(colRef: CollectionReference, data: any) /* eslint-disable-line @typescript-eslint/no-explicit-any */ {
  try {
    const docRef = await addDoc(colRef, data);
    return docRef;
  } catch (error) {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: colRef.path,
        operation: 'create',
        requestResourceData: data,
      })
    )
    throw error;
  }
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export async function updateDocumentNonBlocking(docRef: DocumentReference, data: any) /* eslint-disable-line @typescript-eslint/no-explicit-any */ {
  try {
    await updateDoc(docRef, data)
  } catch (error) {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: data,
      })
    )
    throw error;
  }
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export async function deleteDocumentNonBlocking(docRef: DocumentReference) {
  try {
    await deleteDoc(docRef)
  } catch (error) {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      })
    )
    throw error;
  }
}

    