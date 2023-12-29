import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDelteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventToDateEvent } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualiza
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Añade
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error al guardar',
        error.response.data?.msg || 'Error al intentar guardar',
        'error',
      );
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDelteEvent());
      Swal.fire('Evento eliminado', undefined, 'success');
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error al eliminar',
        error.response.data?.msg || 'Error al intentar eliminar',
        'error',
      );
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventToDateEvent(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos:' + error);
    }
  };

  return {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    //* Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
