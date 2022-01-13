using System;
namespace backend.Domain.Entity;

public interface IModel
{
    public Guid guid { get; set; }

    public Guid extGuid { get; set; }

    public DateTime createdDate { get; set; }


}